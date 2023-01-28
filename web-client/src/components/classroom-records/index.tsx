import React from 'react';
import { useGetClassRoomRecords } from '../../hooks/useGetClassRoomRecords';
import Table from './table';

const ClassRoomRecordsComponents: React.FC = () => {
  const { data, refetch } = useGetClassRoomRecords();

  return (
    <div className="mt-2 ml-28 mr-28">
      <h1 className="text-gray-500 text-xl mb-2">Classroom Attendance</h1>
      <Table data={data?.data} refetch={refetch} />
    </div>
  );
};

export default ClassRoomRecordsComponents;
