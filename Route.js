const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/tasks
// @desc    Create a task
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newTask = new Task({
      description: req.body.description,
      isDone: req.body.isDone,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task.description = req.body.description || task.description;
    task.isDone = req.body.isDone !== undefined ? req.body.isDone : task.isDone;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await task.remove();
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
