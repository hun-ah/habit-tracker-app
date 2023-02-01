const express = require('express')
const router = express.Router()
const errorController = require('../controllers/errors')

router.get('*', errorController.render404)

module.exports = router