import React from 'react';
import logo from '../../../assets/images/SPCT_LOGO.jpg';
import { useDate } from '../../../hooks/useDate';

const Headers: React.FC = () => {
  const { date, time } = useDate();
  // const dt = new Date();
  // const _dt = dt.toLocaleString('en-US', { timeZone: 'Asia/Manila' });
  return (
    <div className="flex flex-row">
      <div className="flex-1 bg-white py-3 px-16 flex flex-row">
        <img
          src={logo}
          alt="..."
          className="rounded-full w-16 h-16 border-black-500 mr-3"
        />
        <div className="mt-1">
          <p className="text-sm font-bold">
            Saint Peter's College of Toril, INC.
          </p>
          <p className="text-xs">MC Arthur High Way, Crossing Bayabas,</p>
          <p className="text-xs">Toril, Davao City, Philippines</p>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-end">
        <p className="text-lg font-semibold mr-2 mb-2">{`${date},${time}`}</p>
      </div>
    </div>
  );
};

export default Headers;
