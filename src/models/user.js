const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Token = require('./token');
require('dotenv').config();

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email : {
        type: String,
        unique: true,
        required: 'Email is required',
        trim: true
    },
    password : {
        type: String,
        required: 'Password is Required',
        max: 100
    },
    profileImage : {
        type: String,
        required: false,
        max: 255
    },
    isVerified : {
        type: Boolean,
        default: false,
    },
    GFGid : {
        type: String,
        default: null,
    },
    Codeforcesid : {
        type: String,
        default: null,
    },
    Hackerrankid : {
        type: String,
        default: null,
    },
    codechefid: {
        type: String,
        default: null,
    },
    spojid:{
        type: String,
        default: null,
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'blog'
    }],
    vedios: [{
        type: Schema.Types.ObjectId,
        ref: 'vedio'
    }],
    playlists: [{
        type: Schema.Types.ObjectId,
        ref: 'playlist'
    }],
    vediodone: [{
        type: Schema.Types.ObjectId,
        ref: 'vedio'
    }],
    role:{
        type: String,
        default: 'basic'
    },
    resetPasswordToken : {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    },
    
}, {timestamps: true});


UserSchema.pre('save',  function(next) {
    const user = this;

    if(!user.isModified('password')) 
        return next();

    bcrypt.genSalt(10, function(err, salt) {
        if(err) 
            return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {

            if(err) 
                return next(err);

            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


UserSchema.methods.generateJWT = function(){
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload ={
        id : this._id,
        email: this.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000;
}

UserSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};

module.exports = mongoose.model('Users', UserSchema);
