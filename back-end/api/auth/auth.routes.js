const express = require('express')
const router = express.Router()

const { login, signup, logout } = require('./auth.controller');
const { requireAuth } = require('../../middlewares/require.Auth.middleware')


router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', requireAuth, logout)

module.exports = router