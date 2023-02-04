const express = require('express')
const habits = require('../controllers/habits')
const router = express.Router()
const habitsController = require('../controllers/habits')
const { ensureAuthenticated } = require('../config/auth')


router.get('/', ensureAuthenticated, habitsController.getPage)

router.post('/createHabit', habitsController.createHabit)

router.put('/updateHabit', habitsController.updateHabit)

router.put('/undoHabit', habitsController.undoHabit)

router.delete('/deleteHabit', habitsController.deleteHabit)

module.exports = router