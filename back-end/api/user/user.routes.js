const express = require('express')
const router = express.Router()
const { getUser , updateUser } = require('./user.controller')


router.get('/:userId', getUser)
router.put('/:userId', updateUser)


module.exports = router