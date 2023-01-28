import React from 'react';
import DropDown from '../../../shared/dropDown';
import Input from '../../../shared/input';

interface Props {
  department: any;
  setDepartment: any;
}

const LeftInput: React.FC<Props> = ({ department, setDepartment }) => {
  return (
    <div className="flex-1 flex flex-col justify-center p-10">
      <DropDown
        label="Department"
        data={['BSIT', 'HRDM']}
        state={department}
        setState={setDepartment}
      />
      <Input
        hasIcon={false}
        placeholder="type here ..."
        type="text"
        id="Name"
        name="Name"
        size="base"
        mb="lg"
        label="Full Name"
        labelColor="gray"
      />
      <Input
        hasIcon={false}
        placeholder="type here ..."
        type="text"
        id="IdNumber"
        name="IdNumber"
        size="base"
        mb="lg"
        label="Id Number"
        labelColor="gray"
      />
      <Input
        hasIcon={false}
        type="date"
        id="BirthDate"
        name="BirthDate"
        size="base"
        mb="lg"
        label="Birth Date"
        labelColor="gray"
      />
    </div>
  );
};

export default LeftInput;
