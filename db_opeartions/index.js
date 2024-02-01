const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./database/schemas/User")
const mongoDBURI = "mongodb://127.0.0.1:27017/market";
app.use(express.json())
mongoose.connect(mongoDBURI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });



    app.post('/register',async (req,res)=>{
        const {username,password,email}= req.body;
        const userDB = await User.findOne({$or:[{username},{email}]});
        if(userDB){
            res.sendstatus(401).send({msg:"user already exists"})
        }
        else{
            const newUser= await User.create({username,password,email});
            (await newUser).save()
            res.send(201);
        }
    })