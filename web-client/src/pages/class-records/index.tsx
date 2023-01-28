import React from 'react';
import ClassRecordsComponents from '../../components/class-records';
import Headers from '../shared/headers';
import NavBar from '../shared/navBar';

const ClassRecordsPage: React.FC = () => {
  return (
    <>
      <Headers />
      <NavBar />
      <ClassRecordsComponents />
    </>
  );
};

export default ClassRecordsPage;
