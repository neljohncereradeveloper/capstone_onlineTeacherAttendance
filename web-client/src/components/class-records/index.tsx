import React from 'react';
import { Link } from 'react-router-dom';
import { useGetClassRecords } from '../../hooks/useGetClassRecords';
import Table from './table';

const ClassRecordsComponents: React.FC = () => {
  const { data } = useGetClassRecords();

  return (
    <div className="mt-2 ml-28 mr-28">
      <h1 className="text-gray-500 text-xl mb-2">Class Records</h1>
      <div className="w-full flex items-center justify-between mb-3">
        <Link
          className="
            text-lg
            font-bold
            underline
            my-1
            text-gray-700
            dark:text-gray-200
            hover:text-indigo-500
            dark:hover:text-indigo-400
          "
          to="/class-registration"
        >
          Add Class
        </Link>
      </div>
      <Table data={data?.data} />
    </div>
  );
};

export default ClassRecordsComponents;
