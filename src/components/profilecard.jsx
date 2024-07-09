"use client";
import { useSession } from 'next-auth/react';
import React from 'react';

const ProfileCard = () => {
  const { data: session, status } = useSession();
  const username = session?.user?.username || "user";
    return (
        <div className="border p-4 rounded-lg shadow">
          <div className="text-center mb-4">
            <img src="/path/to/avatar.png" alt="Avatar" className="w-16 h-16 rounded-full mx-auto" />
            <h2 className="text-xl font-semibold mt-2">{username}</h2>
            <p className="text-gray-500">Member Reguler</p>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Pembelian
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Kupon Saya
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Pengaturan
                </a>
              </li>
            </ul>
          </nav>
        </div>
      );
}
export default ProfileCard;