const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')
const errorController = require('../controllers/errors')
const { ensureGuest } = require('../config/auth')


router.get('/', ensureGuest, loginController.getPage)
router.post('/loginUser', loginController.authenticateLogin)
router.get('/logout', loginController.logout)

module.exports = router