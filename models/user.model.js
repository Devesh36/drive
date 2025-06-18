const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlenght:[3,'Username must be atlest 3 char long']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlenght:[13,'Username must be atlest 3 char long']
    },
     password:{
        type:String,
        required:true,
        trim:true,
        minlenght:[5,'Username must be atlest 3 char long']
    }
})

const user = mongoose.model('user',userSchema)

module.exports = user;