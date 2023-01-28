/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TeacherRegistrationComponents from '../../components/teacher-registration';
import NavBar from '../shared/navBar';
import Headers from '../shared/headers'

const TeacherRegistrationPage: React.FC = () => {
  return (
    <>
      <Headers/>
      <NavBar />
      <TeacherRegistrationComponents />
    </>
  );
};

export default TeacherRegistrationPage;
