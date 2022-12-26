const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// Route 1: Fetch All the notes of the logged in User using GET .. /api/notes/fetchallnotes. Login required 
router.get('/fetchallnotes' ,fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// MAKING CRUD NOTE..


// 1. CREATE NOTE 

// Route 2: Add a note of the logged in User using POST .. /api/notes/addnote . Login required 
router.post('/addnote' ,fetchuser,[
    body('title', "Your title is too short...").isLength({ min: 3 }),
    body('description', "Description must contains atleast 4 characters ").isLength({ min: 4 })
], async (req,res)=>{

    try {
     // If error occurs, return Bad req.
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // validator wali web se liya 
        return res.status(400).json({ errors: errors.array() });
    }
        const {title , description , tag} = req.body; //destruct

        const note = new Notes({ // new note adding
            title , description, tag , user: req.user.id
        })


        // The save() method uses either the insert or the update command, which use the default write concern. 
        //To specify a different write concern, include the write concern in the options parameter.
        const savednote = await note.save(); // saving into db.

        res.json(savednote);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// 2. UPDATE NOTE 

// Route 3: Update an existing  note of the logged in User using PUT .. /api/notes/updatenote:id . Login required 
router.put('/updatenote/:id' ,fetchuser, async (req,res)=>{
    const {title , description , tag}=req.body; // destruct

    try {
    const newNote = {}; // new empty object
    if(title){newNote.title = title}; // changing.
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it.

    let note = await Notes.findById(req.params.id);

    if(!note){ // to check if note belong to that user only.
        return res.status(404).send("Not found");
    }

    if(note.user.toString() !== req.user.id){ // to check if the user is correct or not
        return res.status(401).send("Unauthorized, Not allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true}); 
    // update stuff and if note is not there then new note has been formed.

    res.json({note});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})



// 3. DELETE NOTE 

// Route 4: DELETE an existing  note of the logged in User using PUT .. /api/notes/deletenote:id . Login required 
router.delete('/deletenote/:id' ,fetchuser, async (req,res)=>{
    const {title , description , tag}=req.body; // destruct

    try {
    
    //Find the note to be Deleted and Delete it.
    let note = await Notes.findById(req.params.id);
    if(!note){ // to check if note belong to that user only.
        return res.status(404).send("Not found");
    }
    
    // Allow the deletion only if user own this note
    if(note.user.toString() !== req.user.id){ // to check if the user is correct or not
        return res.status(401).send("Unauthorized, Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id); 
    // delete stuff .

    res.json({Sucess: "Deleted Successfully" , note: note });
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

module.exports =router;