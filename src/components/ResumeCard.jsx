import React from 'react';

const ResumeCard = ({ resume, onClick }) => {
  const { name, email, phone } = resume;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 cursor-pointer border border-slate-500" onClick={() => onClick(resume)}>
      <h2 className="text-xl font-bold text-violet-900">{name}</h2>
      <p className=" text-violet-800">{email}</p>
      <p className="text-violet-700">{phone}</p>
    </div>
  );
};

export default ResumeCard;
