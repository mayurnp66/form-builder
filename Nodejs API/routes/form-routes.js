const express = require('express');

const formController = require('../controllers/form-controller');

const router = express.Router();

router.post('/getFormById',formController.getFormById)

module.exports = router;