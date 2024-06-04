require('dotenv').config();
const express = require('express');
const app = express();
const connectDB =require('./db/connect');

//routes
const users = require('./routes/user');

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use('/api/v1/users',users);


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
