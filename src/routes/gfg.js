const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validator');
const {check} = require('express-validator');

const gfg = require('../controllers/gfg');

router.post('/addTopic', [
    check('topic').not().isEmpty().withMessage({success:false,message:'Topic is required'}),
    check('userId').not().isEmpty().withMessage({success:false,message:'UserId is required'}),
], validate, gfg.gfgTopicAdd);

router.get('/:id', gfg.getGFG);

router.post('/', 
[
    check('title').not().isEmpty().withMessage({success:false,message:'title is required'}),
    check('maintitle').not().isEmpty().withMessage({success:false,message:'maintitle is required'}),
    check('link').not().isEmpty().withMessage({success:false,message:'link is required'}),
    check('topic').not().isEmpty().withMessage({success:false,message:'topic is required'}),
    check('type').not().isEmpty().withMessage({success:false,message:'type is required'}),
    check('userId').not().isEmpty().withMessage({success:false,message:'UserId is required'}),
],
validate, gfg.addGFG);


module.exports = router;