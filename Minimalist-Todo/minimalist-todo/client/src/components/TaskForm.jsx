import React, {useState} from 'react';

export default function TaskForm({onAdd}) {
  const [title,setTitle] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [priority,setPriority] = useState('Low');

  const submit = async (e) => {
    e.preventDefault();
    if(!title.trim()) return;
    const task = { title, dueDate: dueDate ? new Date(dueDate).toISOString() : null, priority };
    onAdd(task);
    setTitle(''); setDueDate(''); setPriority('Low');
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className="border p-2 flex-1" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task..." required/>
      <input type="datetime-local" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="border p-2"/>
      <select value={priority} onChange={e=>setPriority(e.target.value)} className="border p-2">
        <option>High</option><option>Medium</option><option>Low</option>
      </select>
      <button className="bg-blue-600 text-white px-4 rounded">Add</button>
    </form>
  );
}
