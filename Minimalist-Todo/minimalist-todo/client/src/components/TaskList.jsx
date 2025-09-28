import React from 'react';
import API from '../api';

export default function TaskList({tasks, setTasks}) {
  const toggle = async (task) => {
    const updated = {...task, completed: !task.completed};
    setTasks(prev => prev.map(t => t._id === task._id ? updated : t));
    try {
      await API.put(`/tasks/${task._id}`, updated);
    } catch (e) {
      const q = JSON.parse(localStorage.getItem('queue')||'[]');
      q.push({ op:'update', id: task._id, payload: updated });
      localStorage.setItem('queue', JSON.stringify(q));
    }
  };

  const remove = async (id) => {
    setTasks(prev => prev.filter(t => t._id !== id));
    try {
      await API.delete(`/tasks/${id}`);
    } catch (e) {
      const q = JSON.parse(localStorage.getItem('queue')||'[]');
      q.push({ op:'delete', id });
      localStorage.setItem('queue', JSON.stringify(q));
    }
  };

  return (
    <ul className="mt-4">
      {tasks.map(t => (
        <li key={t._id || t._tempId} className="flex items-center justify-between border-b py-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={!!t.completed} onChange={()=>toggle(t)} />
            <div>
              <div className={t.completed ? 'line-through' : ''}>{t.title}</div>
              <div className="text-xs text-gray-500">{t.priority} {t.dueDate ? '• '+ new Date(t.dueDate).toLocaleString() : ''}</div>
            </div>
          </div>
          <button onClick={()=>remove(t._id)} className="text-red-500">Delete</button>
        </li>
      ))}
    </ul>
  );
}
