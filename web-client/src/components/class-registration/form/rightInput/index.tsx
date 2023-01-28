import { FormikProps } from 'formik';
import React from 'react';
import { iconCancel, iconSubmit } from '../../../../assets/icons';
import Button from '../../../shared/button';
import DropDown from '../../../shared/dropDown';
import { scheduleData, subjectTimeData } from './data';

interface ClasssProps {
  year: string;
}
interface Props {
  formik: FormikProps<ClasssProps>;
  subjectTime: any;
  setSubjectTime: any;
  schedule: any;
  setSchedule: any;
  handleReset: () => void;
}

const RightInput: React.FC<Props> = ({
  formik,
  subjectTime,
  setSubjectTime,
  schedule,
  setSchedule,
  handleReset,
}) => {
  return (
    <div className="flex-1 flex flex-col p-10">
      <DropDown
        label="Schedule"
        data={scheduleData}
        state={schedule}
        setState={setSchedule}
      />

      <DropDown
        label="Subject Time"
        data={subjectTimeData}
        state={subjectTime}
        setState={setSubjectTime}
      />
      <div className="flex flex-row">
        <Button
          type="submit"
          text="Submit"
          size="base"
          icon="right"
          iconPath={iconSubmit}
          isLoading={formik.isSubmitting}
        />
        <Button
          backGroundColor="red"
          type="reset"
          text="Reset"
          size="base"
          icon="right"
          ml="base"
          iconPath={iconCancel}
          isLoading={formik.isSubmitting}
          onClick={handleReset}
        />
      </div>
    </div>
  );
};

export default RightInput;
