const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notes: String,
  dueDate: Date,
  priority: { type: String, enum: ['High','Medium','Low'], default: 'Low' },
  tags: [String],
  completed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Task', TaskSchema);
