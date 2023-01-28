import React from 'react';
import { iconPrevious } from '../../assets/icons';
import Button from '../shared/button';
import { useHistory, useLocation } from 'react-router';
import FormTeacherEdit from './form';

interface TeacherProps {
  qrCode: string;
  department: string;
  name: string;
  idNumber: string;
  birthDate: string;
}

const TeacherEditComponents: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
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
      <h1 className="text-gray-500 text-xl mb-2 text-center">Teacher Update</h1>
      <FormTeacherEdit state={location.state as TeacherProps} />
    </div>
  );
};

export default TeacherEditComponents;
