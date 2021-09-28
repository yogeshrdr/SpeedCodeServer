const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validator');
const {check} = require('express-validator');

const codechef = require('../controllers/codechef');

router.get('/', codechef.getContent);

router.get('/:id', codechef.gettopicbyid);


module.exports = router;