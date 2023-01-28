import React from 'react';
import SettingsComponents from '../../components/settings';
import Headers from '../shared/headers';
import NavBar from '../shared/navBar';

const SettingsPage: React.FC = () => {
  return (
    <>
      <Headers />
      <NavBar />
      <SettingsComponents />
    </>
  );
};

export default SettingsPage;
