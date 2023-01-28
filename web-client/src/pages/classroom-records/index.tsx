import React from 'react';
import ClassRoomRecordsComponents from '../../components/classroom-records';
import Headers from '../shared/headers'
import NavBar from '../shared/navBar';

const ClassRoomRecordsPage: React.FC = () => {
  return (
    <>
      <Headers/>
      <NavBar />
      <ClassRoomRecordsComponents />
    </>
  );
};

export default ClassRoomRecordsPage;
