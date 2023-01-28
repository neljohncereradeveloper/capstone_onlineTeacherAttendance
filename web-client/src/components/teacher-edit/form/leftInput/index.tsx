import React from 'react';
import DropDown from '../../../shared/dropDown';
import Input from '../../../shared/input';

interface Props {
  department: any;
  setDepartment: any;
}

const LeftInput: React.FC<Props> = ({ department, setDepartment }) => {
  return (
    <div className="flex-1 flex flex-col p-10">
      <Input
        hasIcon={false}
        placeholder="type here ..."
        type="text"
        id="name"
        name="name"
        size="base"
        mb="lg"
        label="Full Name"
        labelColor="gray"
      />
      <DropDown
        label="Department"
        data={['BSIT', 'HRDM']}
        state={department}
        setState={setDepartment}
      />
    </div>
  );
};

export default LeftInput;
