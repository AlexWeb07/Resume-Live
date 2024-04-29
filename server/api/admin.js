const express=require("express")
const router=express.Router();
const Resume=require('../model/Resume')

router.get('/resumes', async (req, res) => {
    try {
    //   const resumeData = req.body;
      const data = await Resume.find();
      res.status(201).json({ message: 'Resume fetched successfully',resumes:data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports=router