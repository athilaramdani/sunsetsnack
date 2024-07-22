import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBoxOpen, faUser, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Sidebar = ({ onMenuItemClick, judul }) => {
  return (
    <div className="bg-grey h-screen shadow-lg w-64">
      <h1 className="text-2xl font-bold mb-4 px-6 py-4">{judul}</h1>
      <ul>
        <Link href="/">
             <li className="px-6 py-3 flex flex-row text-green-600 hover:text-green-800 cursor-pointer items-center" onClick={() => onMenuItemClick('profile')}>
               <FontAwesomeIcon icon={faArrowLeft} className="mr-3 w-5" />
               Back to Home
             </li>
        </Link>
        <li><hr/></li>
        <li className="px-6 py-3 flex flex-row text-green-600 hover:text-green-800 cursor-pointer items-center" onClick={() => onMenuItemClick('beranda')}>
          <FontAwesomeIcon icon={faHome} className="mr-3 w-5" />
          Beranda
        </li>
        <li><hr/></li>
        <li className="px-6 py-3 flex flex-row text-green-600 hover:text-green-800 cursor-pointer items-center" onClick={() => onMenuItemClick('kelolaProduk')}>
          <FontAwesomeIcon icon={faBoxOpen} className="mr-3 w-5" />
          Kelola Produk
        </li>
        <li><hr/></li>
        <li className="px-6 py-3 flex flex-row text-green-600 hover:text-green-800 cursor-pointer items-center" onClick={() => onMenuItemClick('profile')}>
          <FontAwesomeIcon icon={faUser} className="mr-3 w-5" />
          Profile
        </li>
        <li><hr/></li>
      </ul>
    </div>
  );
};

export default Sidebar;
