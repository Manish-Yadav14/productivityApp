const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {SECRET_KEY} = process.env;

// Generate a JWT token
const generateToken = (user) => {
    return jwt.sign({id: user._id ,email: user.email , name:user.name}, SECRET_KEY, {
      expiresIn: "2h", // Token expires in 2 hour
    });
};

const registerUser = async(req,res)=>{ 
    const {name,email,password} = req.body;
    try {
        //checking if user exists already
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

        const user = await User.create({name,email,password:hashedPassword});

        if(user){
            const token = generateToken(user);
            console.log({token});
            return res.status(201).send({token});
        } 
    } catch (error) {
        return res.status(401).send(`Error: ${error}`);
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        //check for user exists or not...
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({ error: 'User not found' });
        }

        // Compare hashed passwords
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        //generate token
        const token = generateToken(user);

        console.log({token});
        return res.status(201).send({token});

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser
}