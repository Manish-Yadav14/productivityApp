const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false,
    }
})


const longTaskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required :true,
    },
    title:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:true,
    },
    subtasks:[subtaskSchema],
})

module.exports= mongoose.model('longTasks',longTaskSchema);