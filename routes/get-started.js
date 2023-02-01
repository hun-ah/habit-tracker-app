const express = require('express')
const router = express.Router()
const getStartedController = require('../controllers/get-started')
const { ensureGuest } = require('../config/auth')


router.get('/', ensureGuest, getStartedController.getPage)
router.post('/register', getStartedController.registerUser)

module.exports = router