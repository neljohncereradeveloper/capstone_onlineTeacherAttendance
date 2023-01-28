/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Alerts from '../../shared/alerts';
import Tbody from './tbody';
import Thead from './thead';

interface Props {
  data: any[];
  refetch: any;
}

const Table: React.FC<Props> = ({ data, refetch }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState('');
  return (
    <>
      {isSuccess && (
        <Alerts top="10" success text="Teacher Deleted Successfully" />
      )}
      {isError && <Alerts top="10" _error text={isError} />}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div
              className="
          shadow
          overflow-hidden
          border-b border-gray-200
          sm:rounded-lg
        "
            >
              <table className="min-w-full divide-y divide-gray-200">
                <Thead />
                <Tbody
                  data={data}
                  setIsSuccess={setIsSuccess}
                  setIsError={setIsError}
                  refetch={refetch}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
