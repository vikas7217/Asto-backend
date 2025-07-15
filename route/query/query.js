const express = require('express');
const { CreateQuery } = require('../../controler/Query/query');
const { Message } = require('../../controler/Query/message');
const router = express.Router();

router.post('/create',CreateQuery);
router.post('/sentEmail/message',Message)

module.exports = router