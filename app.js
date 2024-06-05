require('dotenv').config();
const express = require('express');
const app = express();
const connectDB =require('./db/connect');

//routes
const users = require('./routes/user');
const tasks = require('./routes/tasks')

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use('/api/v1/users',users);
app.use('/api/v1/tasks',tasks);


// -------------------------------------- Server Initialisation----------------------------------------
const port = process.env.Port || 3000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is Listening on Port ${port}...`);
        });    
    } catch (error) {
        console.log(error);
    }
}
start();
