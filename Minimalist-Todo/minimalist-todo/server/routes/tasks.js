const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req,res)=> {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
});

router.post('/', async (req,res)=> {
  const t = new Task(req.body);
  const saved = await t.save();
  res.json(saved);
});

router.put('/:id', async (req,res)=> {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(updated);
});

router.delete('/:id', async (req,res)=> {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
