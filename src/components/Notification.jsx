import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const Notification = ({ notifications }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 mt-10 border">
      <h1 className="text-lg font-bold mb-4">Notifikasi</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="flex items-center border-b py-2 sm:py-3 md:py-4">
            <FontAwesomeIcon icon={faBell} className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-2 sm:mr-3 md:mr-4" />
            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{notification.pesan}</p>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg">{formatDate(notification.tanggalnotifikasi)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
