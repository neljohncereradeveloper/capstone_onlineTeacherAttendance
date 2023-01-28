import React from 'react';
import { iconPrevious } from '../../assets/icons';
import Button from '../shared/button';
import { useHistory } from 'react-router';
import FormTeacherRegistration from './form';

const TeacherRegistrationComponents: React.FC = () => {
  const history = useHistory();
  return (
    <div className="mt-2 ml-28 mr-28">
      <Button
        backGroundColor="gray"
        type="button"
        text="Back"
        size="base"
        icon="left"
        iconPath={iconPrevious}
        onClick={() => history.goBack()}
        mt="base"
        mb="base"
      />
      <h1 className="text-gray-500 text-xl mb-2 text-center">
        Teacher Registration
      </h1>
      <FormTeacherRegistration />
    </div>
  );
};

export default TeacherRegistrationComponents;
