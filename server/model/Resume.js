const mongoose=require('mongoose')
const resumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    skills: [String],
    workExperiences: [{
      companyName: String,
      jobRole: String,
      startMonth: String,
      startYear: String,
      endMonth: String,
      endYear: String,
      currentlyWorking: Boolean
    }]
  });
  
  // Define MongoDB model
  const Resume = mongoose.model('Resume', resumeSchema);

  module.exports=Resume