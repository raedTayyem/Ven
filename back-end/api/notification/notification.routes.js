const express = require('express');
const router = express.Router();
const { sensNot } = require('./notification.controller');


router.post('/', sensNot);

module.exports = router;