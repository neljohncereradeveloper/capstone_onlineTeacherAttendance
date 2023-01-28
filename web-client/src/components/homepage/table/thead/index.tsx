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
          Classroom
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
          Sched
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
          Status
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
