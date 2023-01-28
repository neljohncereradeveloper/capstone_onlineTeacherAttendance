// import classNames from 'classnames';
import { generate } from 'shortid';
interface Props {
  data: any[] | null;
}

interface classTypes {
  active: string;
  classRoom: string;
  id: string;
  idNumber: string;
  schedule: string;
  semester: string;
  subject: string;
  subjectTime: string;
  teaher: string;
  term: string;
  year: string;
}

const Tbody: React.FC<Props> = ({ data }) => {
  return (
    <tbody className="bg-white m-h-5 bg-local divide-y divide-gray-200">
      {data?.map((row: classTypes) => {
        if (row.teaher === 'Teacher') {
          return null;
        }
        return (
          <tr key={generate()}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {row.classRoom}
            </td>
            <td className="px-2 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {row.teaher}
                  </div>
                  <div className="text-sm text-gray-500">{row.idNumber}</div>
                </div>
              </div>
            </td>
            <td className="pl-5 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {row.subject}
              </div>
              <div className="text-sm text-gray-500">{row.subjectTime}</div>
            </td>
            <td className="pl-5 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {row.semester}
              </div>
              <div className="text-sm text-gray-500">{row.term}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {row.schedule}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {row.year}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={row.active === 'TRUE' ? true : false}
                readOnly={true}
              />
            </td>
         
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tbody;
