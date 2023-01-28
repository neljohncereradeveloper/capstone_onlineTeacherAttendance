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
          Room
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
          Subject
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
          SubjectTime
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
          Teacher
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
          Time In
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
          Time Out
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
        <th
          scope="col"
          className="
                  px-4
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
        >
          Remarks
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
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default Thead;
