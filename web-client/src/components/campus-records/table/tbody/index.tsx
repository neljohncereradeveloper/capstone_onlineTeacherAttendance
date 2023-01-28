/* eslint-disable jsx-a11y/anchor-is-valid */
import shortid from 'shortid';
import React from 'react';

interface Props {
  data: any[] | null;
}

const Tbody: React.FC<Props> = ({ data }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data?.map((record: any[]) => {
        if (record[0] === 'Date') {
          return null;
        }
        return (
          <tr key={shortid.generate()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record[0]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record[2]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record[3]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record[4]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record[5]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {record[6]}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;
