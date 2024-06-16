const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required :true,
    },
    todo:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false,
    }
})

module.exports= mongoose.model('tasks',taskSchema);