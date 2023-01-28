import React from 'react';
import TeacherComponents from '../../components/teacher';
import NavBar from '../shared/navBar';
import Headers from '../shared/headers'

const TeacherPage: React.FC = () => {
  return (
    <>
      <Headers/>
      <NavBar />
      <TeacherComponents />
    </>
  );
};

export default TeacherPage;
