import React from 'react';
import CampusRecordsComponents from '../../components/campus-records';
import NavBar from '../shared/navBar';
import Headers from '../shared/headers'

const CampusRecordsPage: React.FC = () => {
  return (
    <>
     <Headers/>
      <NavBar />
      <CampusRecordsComponents />
    </>
  );
};

export default CampusRecordsPage;
