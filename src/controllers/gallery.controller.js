
   
const express = require('express');

const Gallery = require('../models/gallery.model');

const router=express.Router();

const upload= require('../middlewear/upload');

const fs=require('fs');

router.get('',async (req, res) => {
    try {
        const gallery = await Gallery.find().lean().exec();
        res.status(201).send(gallery);
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})
//post 5 images in server give key as picture and add 5 one by one
router.post("",upload.array("pictures",5),async (req, res) => {
    try {
        let arr=req.files.map(file => file.path);
        const gallery= await Gallery.create({
            pictures: arr
        });
        res.status(250).send(gallery);
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})

router.delete("/:id",async (req, res) => {
    try {
        const gallery=await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        res.send(gallery);
        for(let i=0; i<gallery.pictures.length; i++) {
            fs.unlinkSync(gallery.pictures[i]);
        }
    } catch (err) {
        res.send(500).json({message: err.message,status:"Failed"});
    }
})
module.exports =router;
