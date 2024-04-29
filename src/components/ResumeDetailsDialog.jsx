// ResumeDetailsDialog.js
import React from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";

const ResumeDetailsDialog = ({ resume, onClose }) => {
  const { name, email, phone, skills, workExperiences } = resume;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[40%] overflow-y-auto">
        <div className="mb-4 flex justify-center items-center flex-col">
        <button onClick={onClose} className="absolute top-0 right-0 m-4 text-black hover:text-gray-500">
          ⨉
        </button>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className='flex gap-10'>
            <p className="text-gray-700 flex items-center"><MdOutlineEmail /> &nbsp; {email}</p>
            <p className="text-gray-700 flex items-center"><FaPhoneSquareAlt />&nbsp;{phone}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Skills:</h3>
          <hr className=' bg-slate-700 h-0.5 mb-2' />
          <div>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </div>
        </div>
        
        <div className='mb-4'>
          <h3 className="text-lg font-semibold">Work Experiences:</h3>
          <hr className=' bg-slate-700 h-0.5 mb-2' />
          {workExperiences.map((experience, index) => (
            <div key={index} className="mb-4">
                    {experience.companyName}    
              <div className='flex justify-between items-center'>
              <p className="text-sm text-gray-700">{experience.jobRole}</p>
              <p className="text-sm text-gray-700">
                {experience.startMonth} {experience.startYear} - {experience.currentlyWorking ? 'Present' : `${experience.endMonth} ${experience.endYear}`}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeDetailsDialog;
