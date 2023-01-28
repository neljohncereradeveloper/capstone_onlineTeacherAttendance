/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NavBar from '../shared/navBar';
import Headers from '../shared/headers';
import TeacherEditComponents from '../../components/teacher-edit';

const TeacherEditPage: React.FC = () => {
  return (
    <>
      <Headers />
      <NavBar />
      <TeacherEditComponents />
    </>
  );
};

export default TeacherEditPage;
