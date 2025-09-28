import React, {useEffect, useState} from 'react';
import API from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App(){
  const [tasks, setTasks] = useState([]);

  useEffect(()=> {
    load();
    window.addEventListener('online', syncQueue);
    requestNotificationPermission();
    return ()=> window.removeEventListener('online', syncQueue);
  }, []);

  async function load(){
    try{
      const res = await API.get('/tasks');
      setTasks(res.data);
      localStorage.setItem('tasksCache', JSON.stringify(res.data));
    }catch(e){
      const cache = JSON.parse(localStorage.getItem('tasksCache') || '[]');
      setTasks(cache);
    }
  }

  function addLocal(task){
    const local = { ...task, _tempId: 't'+Date.now(), completed:false };
    setTasks(prev => [local, ...prev]);
    // try to create on server
    (async ()=> {
      try{
        await API.post('/tasks', task);
        load();
      }catch(e){
        const queue = JSON.parse(localStorage.getItem('queue')||'[]');
        queue.push({ op:'create', payload: task });
        localStorage.setItem('queue', JSON.stringify(queue));
        alert('Offline — saved locally and queued for sync.');
      }
    })();
  }

  async function syncQueue(){
    const queue = JSON.parse(localStorage.getItem('queue') || '[]');
    if(!queue.length) return;
    for(const op of queue){
      try{
        if(op.op === 'create') await API.post('/tasks', op.payload);
        if(op.op === 'update') await API.put(`/tasks/${op.id}`, op.payload);
        if(op.op === 'delete') await API.delete(`/tasks/${op.id}`);
      }catch(e){
        console.log('Sync failed', e);
        return;
      }
    }
    localStorage.removeItem('queue');
    load();
  }

  function requestNotificationPermission(){
    if('Notification' in window && Notification.permission === 'default'){
      Notification.requestPermission();
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Minimalist To-do</h1>
      <TaskForm onAdd={addLocal}/>
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
