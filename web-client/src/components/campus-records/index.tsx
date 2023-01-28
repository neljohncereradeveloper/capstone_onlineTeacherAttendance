import React from 'react';
import Table from './table';
import { useGetCampusRecords } from '../../hooks/useGetCampusRecords';

const CampusRecordsComponents: React.FC = () => {
  const { data } = useGetCampusRecords();

  return (
    <div className="mt-2 ml-28 mr-28">
      <h1 className="text-gray-500 text-xl mb-2">Campus Records</h1>

      <Table data={data?.data} />
    </div>
  );
};

export default CampusRecordsComponents;
