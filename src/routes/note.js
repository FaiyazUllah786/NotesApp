const express = require('express');
const router = express.Router();

const Note = require('./../models/note');
//for fetch notes
router.post("/list",async function(req,res){
    var notes = await Note.find({userid:req.body.userid});
    // res.send("This is the Notes page");
    res.json(notes);
});

//for add notes
router.post("/add",async function(req,res){
    
    await Note.deleteOne({id:req.body.id});

    const newNote = new Note({
        id:req.body.id,
        userid:req.body.userid,
        title:req.body.title,
        content:req.body.content
    });
    await newNote.save();
    // res.send("This is the Notes page");
    const response = {message:"new note created"+`userid:${req.body.userid}`};
    res.json(response);
});
//for delete notes
router.post("/delete",async function(req,res){
    await Note.deleteOne({id:req.body.id});
    const response = {message:"Note Deleted "+`id:${req.body.id}`};
    res.json(response);
});

module.exports = router;