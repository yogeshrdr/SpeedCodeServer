const express = require('express');
const {check} = require('express-validator');

const Auth = require('../controllers/auth');
const Password = require('../controllers/passsword');
const validate = require('../middlewares/validator');

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint"});
});

//Registeration
router.post('/register', [
    check('email').isEmail().withMessage({success:false,message:'Email is required'}),
    check('password').not().isEmpty().isLength({min : 6}).withMessage({success:false,message:'password is required of length 6'})
], validate, Auth.register);


//Login
router.post("/login", [
    check('email').isEmail().withMessage({success:false,message:'Email is required'}),
    check('password').not().isEmpty(),
], validate, Auth.login);

//EMAIL Verification
router.get('/verify/:token', Auth.verify);
router.post('/resend', Auth.resendToken);

//Password RESET
router.post('/recover', [
    check('email').isEmail().withMessage({success:false,message:'Email is required'}),
], validate, Password.recover);

router.get('/reset/:token', Password.reset);

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 6}).withMessage({success:false,message:'Email is required'}),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);

module.exports = router;