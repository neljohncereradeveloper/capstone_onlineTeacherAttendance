import { FormikProps } from 'formik';
import React from 'react';
import { iconSubmit } from '../../../../assets/icons';
import Button from '../../../shared/button';
import Input from '../../../shared/input';

interface Props {
  formik: FormikProps<any>;
}

const RightInput: React.FC<Props> = ({ formik }) => {
  return (
    <div className="flex-1 flex flex-col p-10">
      <Input
        hasIcon={false}
        placeholder="type here ..."
        type="text"
        id="idNumber"
        name="idNumber"
        size="base"
        mb="lg"
        label="Id Number"
        labelColor="gray"
      />
      <Input
        hasIcon={false}
        type="date"
        id="birthDate"
        name="birthDate"
        size="base"
        mb="lg"
        label="Birth Date"
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
