const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // let messages = [];
        // errors.array().map((err) => {messages.push(err.msg)});
        // return res.status(422).json({success: false, messages});
        const err = errors.array();
        let message = err[0].msg;
        return res.status(422).json(message);
    }

    next();
};