const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validator');
const {check} = require('express-validator');

const spoj = require('../controllers/spoj');

router.get('/', spoj.getContent);
router.get('/:id', spoj.gettopicbyid);


module.exports = router;