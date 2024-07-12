"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faTicket, faGear, faStore } from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ onMenuItemClick }) => {
  const { data: session, status } = useSession();
  const [sellerButton, setSellerButton] = useState("Jadi Seller");
  const [userData, setUserData] = useState({
    username: '',
  });

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/user/userinfo`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserData(data);
          if (data.role === 'PENJUAL') {
            setSellerButton("Gerai mu");
          }
        } catch (error) {
          console.log("Cannot show username:", error);
        }
      };

      fetchData();
    }
  }, [status]);

  return (
    <div className="border p-4 rounded-lg shadow">
      <div className="text-center mb-4">
        <img src={userData.image || '/images/userdefault.jpg'} alt="Avatar" className="w-16 h-16 rounded-full mx-auto" />
        <h2 className="text-xl font-semibold mt-2">{userData.username}</h2>
        <p className="text-gray-500">Member {userData.rank}</p>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a onClick={() => onMenuItemClick('history')} className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faReceipt} className="mr-2" />
              Pembelian
            </a>
          </li>
          <li>
            <a onClick={() => onMenuItemClick('kupon')} className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faTicket} className="mr-2" />
              Kupon Saya
            </a>
          </li>
          <li>
            <a onClick={() => onMenuItemClick('profile')} className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faGear} className="mr-2" />
              Pengaturan
            </a>
          </li>
          <li>
            <a onClick={() => onMenuItemClick('seller')} className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
              <FontAwesomeIcon icon={faStore} className="mr-2" />
              {sellerButton}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileCard;
