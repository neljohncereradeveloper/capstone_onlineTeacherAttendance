import React from "react";
import SettingsForm from "./form";
import { useGetSettingsRecords } from "../../hooks/useGetSettingsRecords";

interface SettingsProps {
  semester: string;
  term: string;
  year: string;
}

const SettingsComponents: React.FC = () => {
  const { data, refetch } = useGetSettingsRecords();
  const settings: SettingsProps = data?.data;
  const [openForm, setOpenForm] = React.useState(false);
  const handleChangeSettings = () => {
    setOpenForm((prev) => !prev);
  };

  React.useEffect(() => {});
  return (
    <div className="mt-2 ml-28 mr-28">
      <h1 className="text-gray-500 text-xl mb-2">Settings</h1>
      <div className="flex flex-row flex-1">
        <div className="flex-1 flex flex-col pt-10 pb-10 pr-10">
          <button
            className="bg-gray-400 text-white border border-gray-500 p-2 w-1/3 mb-5 hover:bg-gray-900"
            onClick={handleChangeSettings}
          >
            Change Settings
          </button>
          <label className="text-gray-500" htmlFor="Semester">
            Semester
          </label>
          <div className="rounded text-gray-900 border border-gray-200 mb-5 p-2">
            {settings?.semester}
          </div>

          <label className="text-gray-500" htmlFor="Term">
            Term
          </label>
          <div className="rounded text-gray-900 border border-gray-200 mb-5 p-2">
            {settings?.term}
          </div>

          <label className="text-gray-500" htmlFor="Year">
            Year
          </label>
          <div className="rounded text-gray-900 border border-gray-200 mb-5 p-2">
            {settings?.year}
          </div>
        </div>
        <SettingsForm openForm={openForm} refetch={refetch} />
      </div>
    </div>
  );
};

export default SettingsComponents;
