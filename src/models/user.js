const { model, Schema} = require('mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        requires: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamp: true
});

module.exports = model('user', userSchema);