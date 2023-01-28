import React from 'react';
import { useGetTeachersRecords } from '../../hooks/useGetTeachersRecords';
import Table from './table';
import { Link } from 'react-router-dom';

const TeacherComponents: React.FC = () => {
  const { data, refetch } = useGetTeachersRecords();

  return (
    <div className="mt-2 ml-28 mr-28">
      <h1 className="text-gray-500 text-xl mb-2">Teacher Records</h1>
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
          to="/teacher-registration"
        >
          Registration
        </Link>
      </div>

      <Table data={data?.data} refetch={refetch} />
    </div>
  );
};

export default TeacherComponents;
