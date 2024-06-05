const mongoose = require('mongoose');

const longTermTaskSchema = new mongoose.Schema({
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
    },
    subtasks:{
        type:Array,
    }
})

module.exports= mongoose.model('longTermTasks',longTermTaskSchema);