const longTask = require('../models/longTasks');
const User = require('../models/user');

const createLongTask = async(req,res)=>{
    const {userId,title,isCompleted,subtasks} = req.body;
    try{
        const user = User.findOne({userId});
        if(user){
            const task = await longTask.create({userId,title,isCompleted,subtasks});
            if(task){
                return res.status(201).send(task);
            }
        }
        else{
            return res.status(404).send({msg:"can't find user with that id.."})
        }
    }
    catch(error){
        return res.status(500).send({msg:error});
    }
}

const updateLongTask = async(req,res)=>{
    const {taskId,title,isCompleted,subtasks} = req.body;
    try {
        const updatedTask = await longTask.
        findByIdAndUpdate(
            {_id:taskId},
            title,
            isCompleted,
            { $push: { subtasks: { $each: subtasks } } },
            { new: true, useFindAndModify: false }
        )
        if(updatedTask){
            return res.status(201).send(updatedTask);
        }
        else{
            return res.status(404).send({msg:"can't find user with that id.."})
        }
    } catch (error) {
        return res.status(500).send({msg:error});
    }
}

const deleteLongTask = async(req,res)=>{
    const {taskId} = req.body;
    try {
        const deletedTask = longTask.findByIdAndDelete({_id:taskId});
        if(!deletedTask){
            return res.status(404).send({msg:`No task with id : ${taskId}`});
        }
        return res.status(201).send(deletedTask);
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

const getAllLongTasks = async(req,res)=>{
    const {userId} = req.body;
    try{
        const tasks = await longTask.find({userId});
        if(tasks){
          return res.status(201).send(tasks);//gives an array of all tasks of requested user
        }
    }
    catch(error){
        return res.status(500).send({msg:error});
    }
}


module.exports =  {createLongTask,updateLongTask,deleteLongTask,getAllLongTasks};