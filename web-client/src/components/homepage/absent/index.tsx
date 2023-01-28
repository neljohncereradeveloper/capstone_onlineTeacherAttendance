import React from 'react';
import shortid from 'shortid';
import { formatDate } from '../../../lib/formatDate';

interface Props {
  data: any[] | null;
}

const ContainerAbsent: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col items-start bg-red-500 p-2">
      <div className="flex flex-row mb-5">
        <h1 className="text-red-100 text-lg font-bold">Todays Absenses : </h1>
        <h2 className="text-red-100 text-sm mt-1 ml-2">
          {formatDate(new Date())}
        </h2>
      </div>

      {data?.map((record: any[]) => (
        <div
          key={shortid.generate()}
          className="bg-red-200 p-3 mb-5 rounded-sm flex flex-col w-full"
        >
          <p>
            Room :{' '}
            <span className="text-lg font-semibold ml-6"> {record[2]}</span>
          </p>
          <p>
            Teacher :{' '}
            <span className="text-lg font-semibold ml-3"> {record[5]}</span>
          </p>

          <p>
            Subject :
            <span className="text-lg font-semibold ml-4"> {record[3]}</span>
          </p>
          <p>
            Subject Time :
            <span className="text-lg font-semibold ml-3"> {record[4]}</span>
          </p>
          <p>
            Status :<span className="text-lg font-semibold ml-3">Absent</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ContainerAbsent;
