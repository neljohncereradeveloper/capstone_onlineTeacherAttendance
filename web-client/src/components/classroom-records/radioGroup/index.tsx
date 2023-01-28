import React from 'react';

interface Props {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const RadioGroup: React.FC<Props> = ({ setStatus }) => {
  return (
    <div className="flex mt-4 mb-4">
      <h5 className="text-gray-700">Filter by : </h5>
      <label className="inline-flex items-center mr-4 ml-4">
        <input
          type="radio"
          className="form-radio"
          name="radio"
          value="all"
          defaultChecked
          onChange={(e) => setStatus(e.currentTarget.value)}
        />
        <span className="ml-2 text-gray-700">All</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio"
          name="radio"
          value="present"
          onChange={(e) => setStatus(e.currentTarget.value)}
        />
        <span className="ml-2 text-gray-700">Present</span>
      </label>
      <label className="inline-flex items-center mr-4 ml-4">
        <input
          type="radio"
          className="form-radio"
          name="radio"
          value="late"
          onChange={(e) => setStatus(e.currentTarget.value)}
        />
        <span className="ml-2 text-gray-700">Late</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio"
          name="radio"
          value="absent"
          onChange={(e) => setStatus(e.currentTarget.value)}
        />
        <span className="ml-2 text-gray-700">Absent</span>
      </label>
    </div>
  );
};

export default RadioGroup;
