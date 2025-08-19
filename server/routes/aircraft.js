const express = require('express');
const router = express.Router();
const Aircraft = require('../models/Aircraft');

// @desc    Get all aircrafts
// @route   GET /api/aircrafts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const aircrafts = await Aircraft.find();
    res.json(aircrafts);
  } catch (error) {
    console.error('Error fetching aircrafts:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get a single aircraft by ID
// @route   GET /api/aircrafts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const aircraft = await Aircraft.findById(req.params.id);
    if (!aircraft) {
      return res.status(404).json({ message: 'Aircraft not found' });
    }
    res.json(aircraft);
  } catch (error) {
    console.error('Error fetching aircraft:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
