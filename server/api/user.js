const express=require("express")
const router=express.Router();
const Resume=require("../model/Resume")

router.post('/', async (req, res) => {
    try {
      const resumeData = req.body;
      const newResume = new Resume(resumeData);
      await newResume.save();
      res.status(201).json({ message: 'Resume saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports=router