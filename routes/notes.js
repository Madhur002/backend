import express from "express";
import fetchuser from "../middleware/fetchuser";
import Notes from "../models/Notes";
const router = express.Router();

router.get('/fetchallnotes',fetchuser, async (req, res) => {
try {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
}  catch (error) {
    console.error(error.message);
    res.status(500).send("sorry no notes here"); 
  }

})

export default router;
