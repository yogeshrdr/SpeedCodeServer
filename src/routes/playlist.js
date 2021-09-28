const express = require('express');
const {check} = require('express-validator');

const playlist = require('../controllers/playlist');
const validate = require('../middlewares/validator');

const router = express.Router();

router.get('/', playlist.getallPlaylist);


router.post('/',  [
    check('title').not().isEmpty().withMessage({success:false,message:'Title is required'}),
    check('vedios').not().isEmpty().withMessage({success:false,message:'Vedios is required'}),
    check('userId').not().isEmpty().withMessage({success:false,message:'UserId is required'})
], validate, playlist.addPlaylist);


router.get('/:id', playlist.getuserPlaylist);

router.put('/:id',[
    check('userId').not().isEmpty().withMessage({success:false,message:'userId is required'}),
], validate, playlist.updatePlaylist);

router.delete('/:id',[
    check('userId').not().isEmpty().withMessage({success:false,message:'userId is required'}),
], validate, playlist.deletePlaylist);

router.get('/vedios/:id', playlist.getplaylistvedios)


module.exports = router;