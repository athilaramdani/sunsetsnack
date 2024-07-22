import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const notifications = [
  { message: 'Pembelianmu Berhasil Dilakukan', date: '8 Juni 2024' },
  { message: 'Akunmu berhasil terdaftar', date: '8 Juni 2024' }
];

const Notification = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border">
      <h1 className="text-2xl font-bold mb-4">Notifikasi</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="flex items-center border-b py-4">
            <FontAwesomeIcon icon={faBell} className="text-yellow-400 w-6 h-6 mr-4" />
            <div>
              <p className="text-lg font-semibold">{notification.message}</p>
              <p className="text-gray-500">{notification.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
