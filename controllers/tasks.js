const Task = require('../models/tasks');
const User = require('../models/user');


const getAllTasks = async(req,res)=>{
    const {userId} = req.body;
    try{
        const tasks = await Task.find({userId});
        return res.status(201).send(tasks);//gives an array of all tasks of requested user
    }
    catch(error){
        return res.status(500).send({msg:error});
    }
}

const createTask = async(req,res)=>{
    const {userId,todo,isCompleted} = req.body;
    try {
        const user = await User.findOne({_id:userId});
        if(user){ 
            const task = await Task.create({userId,todo,isCompleted});
            if(task){
                return res.status(201).send(task);
            }  
        }
        else{
            return res.status(404).send({msg:"can't find user with that id.."})
        }
    } 
    catch (error) {   
        return res.status(500).send({msg:error});
    }
}

const deleteTask = async(req,res)=>{
    const {taskId} = req.body;
    try{
        const task = await Task.findOneAndDelete({_id:taskId});
        if(!task){
            return res.status(404).send({msg:`no Task with id :${taskId}`});
        }
        return res.status(201).send(task);
    }
    catch(error){
        return res.status(500).send({msg:error});
    }
}

const updateTask = async(req,res)=>{
    try {
        const{taskId,todo,isCompleted} = req.body;
        const task = await Task.findOneAndUpdate({_id:taskId},{todo,isCompleted},{
            new:true,
            runValidators:true,
        });
        if(!task){
            return res.status(404).send({msg:`no Task with id :${taskId}`});
        };
        res.status(200).send([task]);
    } catch (error) {
        res.status(500).send({msg:error});   
    }
}

module.exports = {createTask,deleteTask,getAllTasks,updateTask};