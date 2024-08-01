import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const NotificationList = ({ notifications, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy');
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border p-4 mb-2">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="transition-opacity duration-500 ease-in-out opacity-100">
      <h2 className="text-lg font-semibold mb-4">Notifikasi</h2>
      <div>
        {notifications.map((notification) => (
          <div key={notification.notificationId} className="border p-4 mb-2">
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <h4 className="font-semibold">{notification.judul}</h4>
                <p className="text-sm">{notification.pesan}</p>
                <p className="text-sm">Tanggal: {formatDate(notification.tanggalnotifikasi)}</p>
              </div>
              <FontAwesomeIcon icon={faBell} className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 mr-2 sm:mr-3 md:mr-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
