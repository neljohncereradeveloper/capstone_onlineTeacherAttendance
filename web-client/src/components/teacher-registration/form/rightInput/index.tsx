import { FormikProps } from 'formik';
import React from 'react';
import { iconSubmit } from '../../../../assets/icons';
import { TeacherProps } from '../../../../types';
import Button from '../../../shared/button';
import Input from '../../../shared/input';

interface Props {
  formik: FormikProps<TeacherProps>;
}

const RightInput: React.FC<Props> = ({ formik }) => {
  return (
    <div className="flex-1 flex flex-col p-10">
      <Input
        hasIcon={false}
        placeholder="type here ..."
        type="text"
        id="UserName"
        name="UserName"
        size="base"
        mb="lg"
        label="User Name"
        labelColor="gray"
      />
      <Input
        disabled={true}
        hasIcon={false}
        type="text"
        id="Password"
        name="Password"
        size="base"
        mb="lg"
        label="Password"
        labelColor="gray"
      />
      <Button
        type="submit"
        text="Submit"
        size="base"
        icon="right"
        iconPath={iconSubmit}
        isLoading={formik.isSubmitting}
      />
    </div>
  );
};

export default RightInput;
