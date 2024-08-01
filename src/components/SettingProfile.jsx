"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SettingForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState({
    nama: '',
    username: '',
    no_telp: '',
  });
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
        } catch (error) {
          setError(error.message);
        }
      };

      fetchData();
    }
  }, [session, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nama', userData.nama);
    formData.append('username', userData.username);
    formData.append('no_telp', userData.no_telp || '');
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`/api/user/usersetting?userId=${session.user.userId}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserData(data);
      window.location.reload(); // Refresh halaman setelah data berhasil disimpan
    } catch (error) {
      setError(error.message);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    const { user } = session;
    return (
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg w-full">
        <div className="bg-white p-4 shadow rounded-lg w-full">
          <h2 className="text-2xl font-semibold mb-4">Pengaturan</h2>
          <div className="flex items-center mb-4">
            <label htmlFor="image-upload">
              <img
                src={userData.image || '/images/userdefault.jpg'} // Default profile image path
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div>
              <h2 className="font-semibold text-lg">{userData.username}</h2>
              <p className="text-gray-600">Member {userData.rank}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={userData.nama}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value="********" // Placeholder untuk password
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input
                type="text"
                name="no_telp"
                value={userData.no_telp || ''}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="border block w-full border-green-500 text-green-500 mt-9 p-2 rounded hover:bg-green-100">
              Simpan
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </form>
    );
  }

  return <div>Anda belum login</div>;
};

export default SettingForm;
