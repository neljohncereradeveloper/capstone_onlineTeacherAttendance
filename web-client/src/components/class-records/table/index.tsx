/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Tbody from './tbody';
import Thead from './thead';

interface Props {
  data: any[];
}
const Table: React.FC<Props> = ({ data }) => {
  return (
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
              <Tbody data={data} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
