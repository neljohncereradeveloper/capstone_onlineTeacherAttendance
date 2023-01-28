/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NavBar from '../shared/navBar';
import Headers from '../shared/headers';
import ClassRegistrationComponents from '../../components/class-registration';

const ClassRegistrationPage: React.FC = () => {
  return (
    <>
      <Headers />
      <NavBar />
      <ClassRegistrationComponents />
    </>
  );
};

export default ClassRegistrationPage;
