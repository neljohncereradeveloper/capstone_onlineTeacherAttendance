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
          QR
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
          BirthDate
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
          Department
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
          isActive
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
          Action
        </th>
      </tr>
    </thead>
  );
};

export default Thead;
