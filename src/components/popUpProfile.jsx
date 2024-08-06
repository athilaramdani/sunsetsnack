"use client";
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faTicketAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const PopUpProfile = ({user, onMenuItemClick}) => {
  const router = useRouter()
  const handleMenuItemClick = (page) => {
    if (onMenuItemClick) {
      onMenuItemClick(page);
    } else {
      router.push('/profile');
    }
  };
  
  return (
    <div className="max-w-64 mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center mb-4">
        <img
          src={user?.image || '/images/userdefault.jpg' }
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h1 className="text-xl font-bold">{user?.nama}</h1>
          <p className="text-gray-500">Member {user?.rank}</p>
        </div>
      </div>
      <ul>
        <li className="flex items-center py-2 cursor-pointer hover:text-green-600"
        onClick={() => handleMenuItemClick('history')}
        >
          <FontAwesomeIcon icon={faClipboardList}  className="text-gray-500 w-6 h-6 mr-4" />
          Pembelian
        </li>
        <li><hr/></li>
        <li className="flex items-center py-2 cursor-pointer hover:text-green-600"
        onClick={() => handleMenuItemClick('kupon')}
        >
          <FontAwesomeIcon icon={faTicketAlt} className="text-gray-500 w-6 h-6 mr-4" />
          Kupon Saya
        </li>
        <li><hr/></li>
        <li className="flex items-center py-2 cursor-pointer hover:text-green-600"
        onClick={() => handleMenuItemClick('profile')}
        >
          <FontAwesomeIcon icon={faCog} className="text-gray-500 w-6 h-6 mr-4" />
          Pengaturan
        </li>
      </ul>
    </div>
  );
};

export default PopUpProfile;
