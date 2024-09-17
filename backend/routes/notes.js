const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchusers = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

// ROUTE:1 Get all the notes using get '/api/notes/fetchallnotes'. login required
router.get('/fetchallnotes', fetchusers, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE:2 Add a new notes using post '/api/notes/addnotes'. login required
router.post('/addnotes', fetchusers, [
    body('title', 'Title must be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {


    try {
        const { title, description, tag } = req.body;

        // If there are errors then return an error message
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ error: err.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();
        res.json(saveNote);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

});


// ROUTE:3 update an existing notes using put '/api/notes/updatenote'. login required
router.put('/updatenote/:id', fetchusers, async (req, res) => {
    const { title, description, tag } = req.body;

    // create a new notes object
    const newnote = {};
    if (title) { newnote.title = title };
    if (description) { newnote.description = description };
    if (tag) { newnote.tag = tag };

    // find the notes to be updated and update it
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("Not Found");
    }

    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json(notes);

});

// ROUTE:3 delete an existing notes using delete '/api/notes/deletenote'. login required
router.delete("/deletenote/:id", fetchusers, async (req, res) => {
    const { title, description, tag } = req.body;

    // delete the nnotes
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
        return res.status(404).send("Not Found");
    }

    // Allow deletion only if the user owns this note
    if (notes.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note deleted successfully", notes: notes });
});

module.exports = router;