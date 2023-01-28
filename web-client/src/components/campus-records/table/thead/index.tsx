import React from 'react';

const Thead: React.FC = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Date
        </th>
        <th
          scope="col"
          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Name
        </th>
        <th
          scope="col"
          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Idnumber
        </th>
        <th
          scope="col"
          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Time IN
        </th>
        <th
          scope="col"
          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Time OUT
        </th>
        <th
          scope="col"
          className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Status
        </th>
      </tr>
    </thead>
  );
};

export default Thead;
