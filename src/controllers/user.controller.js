const express= require("express");


const User= require("../models/user.model.js");
const upload = require("../middlewear/upload");
const fs=require('fs')

const router=express.Router();

router.get("/",async (req, res) => {
    try {
        

        const users= await User.find().lean().exec();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).json({message: err.message,error:"Failed"});
    }
})


router.post("/",upload.single("userImages"), async (req,res)=>{
    try{
        const users= await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path,
        })
        return res.status(201).json({users})
    }
    catch(e){
        return res.status(500).json({status:"failed", message:e.message});
    }


});

//for mutiple files use "/multriple or any at route" upload.any
//const filePaths=req.files.map((file) => file.path);


router.delete("/:id",async (req, res) => {
    try {
        

        const users= await User.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(users);
        fs.unlinkSync(users.profile_pic)
    } catch (err) {
        res.status(500).json({message: err.message,error:"Failed"});
    }
});
router.patch("/:id",upload.single("profile_image"),async (req, res) => {
    try {
        const usernow= await User.findById(req.params.id).lean().exec();
        
        const user=await User.findByIdAndUpdate(req.params.id,{
            first_name: req.body?.first_name,
            last_name: req.body?.last_name,
            profile_image: req.file?.path
        },{new:true}).lean().exec();
        res.status(200).send(user);
        if(req.file?.path) {
            fs.unlinkSync(usernow.profile_image)
        }
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
});

    
    
    
        




    
    
    

    
    

module.exports=router;