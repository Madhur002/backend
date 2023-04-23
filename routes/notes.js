import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Notes from "../models/Notes.js";
import { body, validationResult } from 'express-validator';
const router = express.Router();


// Route 1  To fetch all the notes that our user has created with /api/auth/fetchallnotes login required
router.get('/fetchnotes',fetchuser, async (req, res) => {
try {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error"); 
  }
})



// Route 2  To add the notes that our user has created with /api/auth/addnote login required

router.post('/addnote',fetchuser, [
  body('title', 'Enter a valid title').isLength({ min:3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
try {
  const { title, description, tag } = req.body;
   // If there are errors, return Bad request and errors
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
   }
  const notes = new Notes({
    title, description, tag, user: req.user.id
  })
  const savednotes = await notes.save()

  res.json(savednotes)
}
catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error"); 
}
})

export default router;
