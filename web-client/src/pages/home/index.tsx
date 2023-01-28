/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NavBar from '../shared/navBar';
import Headers from '../shared/headers';
import HomePageComponents from '../../components/homepage';

const HomePage: React.FC = () => {
  return (
    <>
      <Headers />
      <NavBar />
      <HomePageComponents />
    </>
  );
};

export default HomePage;
