import React, { useState, useEffect } from 'react';
import ResumeCard from './ResumeCard';
import ResumeDetailsDialog from './ResumeDetailsDialog';

const AdminPage = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  // Sample resume data, replace with your actual data
  const [resumes,setResumes]=useState([])

  // Initialize filtered resumes with all resumes
  useEffect(() => {
    const fetchApi=async ()=>{
        const response = await fetch('http://localhost:3000/api/admin/resumes', {
        method: 'GET',
      });
      const data=await response.json()
      setFilteredResumes(data.resumes);
      setResumes(data.resumes)
    }
    fetchApi();
    
  }, []);

  // Function to handle card click
  const handleCardClick = (resume) => {
    setSelectedResume(resume);
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setSelectedResume(null);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterResumes(e.target.value, selectedOptions);
  };

  // Function to handle option select
  const handleOptionSelect = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      filterResumes(searchTerm, [...selectedOptions, option]);
    }
  };

  // Function to handle option deselect
  const handleOptionDeselect = (option) => {
    const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
    setSelectedOptions(updatedOptions);
    filterResumes(searchTerm, updatedOptions);
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedOptions([]);
    setFilteredResumes(resumes); // Reset filtered resumes to all resumes
    setShowNoDataMessage(false);
  };

  // Function to filter resumes based on search term and selected options
  const filterResumes = (term, options) => {
    let filtered;
    if (options.length === 0) {
      filtered = resumes.filter((resume) =>
        resume.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      filtered = resumes.filter((resume) =>
        options.every((option) =>
          resume.skills.includes(option) && resume.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    setFilteredResumes(filtered);
    setShowNoDataMessage(filtered.length === 0);
  };

  // Options for filtering
  const options = ['HTML', 'CSS', 'JavaScript', 'Java', 'PHP', 'ReactJS', 'NodeJS', 'ExpressJS', 'MySQL', 'MongoDB'];

  return (
    <div className='w-full h-full flex justify-center items-center'>
    <div className="container w-[80%] h-[80%] mt-8 p-10 bg-white shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">All Resumes</h1>
      <div className="mb-4">
        {selectedOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionDeselect(option)}
            className="inline-block bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 focus:outline-none"
          >
            {option} <span className="ml-2">×</span>
          </button>
        ))}
      </div>
      <div className="mb-4">
        <select
          value=""
          onChange={(e) => handleOptionSelect(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a skill</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {showNoDataMessage && (
        <div className="text-red-500 font-semibold mb-4">
          No resumes match the selected filters.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResumes.map((resume, index) => (
          <ResumeCard key={index} resume={resume} onClick={handleCardClick} />
        ))}
      </div>
      {selectedResume && <ResumeDetailsDialog resume={selectedResume} onClose={handleCloseDialog} />}
      {selectedOptions.length > 0 && (
        <button
          onClick={handleClearFilters}
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none"
        >
          Clear Filters
        </button>
      )}
    </div>
    </div>
  );
};

export default AdminPage;
