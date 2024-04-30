import React, { useState } from 'react';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedSkill: '',
    skills: [],
    workExperiences: [
      {
        companyName: '',
        jobRole: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: ''
      }
    ]
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 50 }, (_, i) => String(2023 - i));

  const skillsList = [
    "HTML", "CSS", "JavaScript", "Java", "PHP",
    "ReactJS", "NodeJS", "ExpressJS", "MySQL", "MongoDB"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillSelect = (e) => {
    const skill=e.target.value
    console.log(skill)
    if (!formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        selectedSkill: '',
        skills: [...formData.skills, skill]
      });
      e.target.value=""
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleWorkExperienceChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedWorkExperiences = [...formData.workExperiences];
  
    // If checkbox clicked, update currentlyWorking for all experiences
    if (type === "checkbox") {
      updatedWorkExperiences.forEach((exp, i) => {
        if (i === index) {
          exp.currentlyWorking = checked;
          // If currently working, clear endMonth and endYear
          if (checked) {
            exp.endMonth = '';
            exp.endYear = '';
          }
        } else {
          exp.currentlyWorking = false;
        }
      });
    } else {
      updatedWorkExperiences[index][name] = value;
    }
  
    setFormData({
      ...formData,
      workExperiences: updatedWorkExperiences
    });
  };
  

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [
        ...formData.workExperiences,
        {
          companyName: '',
          jobRole: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: ''
        }
      ]
    });
  };

  const handleRemoveExperience = (index) => {
    const updatedWorkExperiences = [...formData.workExperiences];
    updatedWorkExperiences.splice(index, 1);
    setFormData({
      ...formData,
      workExperiences: updatedWorkExperiences
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can implement logic to store the form data
    console.log(formData);
    // Reset form after submission
    try {
      // Make POST request using Fetch API
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(response.ok) {
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          skills: [],
          workExperiences: [
            {
              companyName: '',
              jobRole: '',
              startMonth: '',
              startYear: '',
              endMonth: '',
              endYear: '',
              currentlyWorking: false
            }
          ]
        });
        alert('Resume data submitted successfully');
      } else {
        // Handle errors
        console.error('Failed to submit resume data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting resume data:', error);
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="container mt-8 p-6 w-[60%] h-[85%] bg-white rounded-lg shadow-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center text-violet-800">Create Your Resume</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-orange-600 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-orange-600 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-orange-600 font-bold mb-2">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-orange-600 font-bold mb-2">Skills</label>
          <div className="flex flex-wrap items-center">
            {formData.skills.map((skill, index) => (
              <button
                key={index}
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md mr-2 mb-2"
                onClick={() => handleSkillRemove(skill)}
              >
                {skill} ⨉
              </button>
            ))}
          </div>
          <div className="relative mt-2">
            <select 
              onChange={handleSkillSelect}
              name="selectedSkills" 
              className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            >
              <option value="" >Add Skills</option>
              {skillsList.map((skill,index)=>{
                return <option key={index} value={skill}>{skill}</option>
              })}
            </select>
          </div>
        </div>
        {formData.workExperiences.map((experience, index) => (
          <div key={index} className="mb-8 p-6 border border-gray-300 rounded-md">
            <div className="flex items-center mb-4">
              <input
                type="text"
                id={`companyName${index}`}
                name="companyName"
                value={experience.companyName}
                onChange={(e) => handleWorkExperienceChange(e, index)}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 mr-4"
                placeholder="Company Name"
                required
              />
              <input
                type="text"
                id={`jobRole${index}`}
                name="jobRole"
                value={experience.jobRole}
                onChange={(e) => handleWorkExperienceChange(e, index)}
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
                placeholder="Job Role"
                required
              />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col mr-4">
                <label className="text-orange-600 mb-2">Start Date</label>
                <div className="flex items-center">
                  <select
                    id={`startMonth${index}`}
                    name="startMonth"
                    value={experience.startMonth}
                    onChange={(e) => handleWorkExperienceChange(e, index)}
                    className="flex-grow px-4 py-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 mr-2"
                    required
                  >
                    <option value="">Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    id={`startYear${index}`}
                    name="startYear"
                    value={experience.startYear}
                    onChange={(e) => handleWorkExperienceChange(e, index)}
                    className="flex-grow px-4 py-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 ml-2"
                    required
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col mr-4">
                <label className="text-orange-600 mb-2">End Date</label>
                <div className="flex items-center">
                  <select
                    id={`endMonth${index}`}
                    name="endMonth"
                    value={experience.endMonth}
                    onChange={(e) => handleWorkExperienceChange(e, index)}
                    className="flex-grow px-4 py-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 mr-2"
                    required={!experience.currentlyWorking}
                    disabled={experience.currentlyWorking}
                  >
                    <option value="">Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    id={`endYear${index}`}
                    name="endYear"
                    value={experience.endYear}
                    onChange={(e) => handleWorkExperienceChange(e, index)}
                    className="flex-grow px-4 py-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500 ml-2"
                    required={!experience.currentlyWorking}
                    disabled={experience.currentlyWorking}
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  id={`currentlyWorking${index}`}
                  name="currentlyWorking"
                  checked={experience.currentlyWorking}
                  onChange={(e) => handleWorkExperienceChange(e, index)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <label htmlFor={`currentlyWorking${index}`} className="ml-yellow 8ext-gray-700">Currently Working</label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove Experience
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddExperience}
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Experience
          </button>
          <button type="submit" className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default MyForm;
