"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const SettingToko = ({ toko, onSave, provinces, cities }) => {
  const { data: session, status } = useSession();
  const [tokoData, setTokoData] = useState({
    nama: toko?.nama || '',
    provinsi: toko?.provinsi || '',
    kota: toko?.kota || '',
    deskripsi: toko?.deskripsi || '',
    alamat: toko?.alamat || '',
    image: toko?.image || null
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (toko) {
      setTokoData({
        nama: toko.nama,
        provinsi: toko.provinsi,
        kota: toko.kota,
        deskripsi: toko.deskripsi,
        alamat: toko.alamat,
        image: toko.image
      });
    }
  }, [toko]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTokoData({ ...tokoData, [name]: value });
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setTokoData({ ...tokoData, image: URL.createObjectURL(file) });
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      const formData = new FormData();
      formData.append('nama', tokoData.nama);
      formData.append('provinsi', tokoData.provinsi);
      formData.append('kota', tokoData.kota);
      formData.append('deskripsi', tokoData.deskripsi);
      formData.append('alamat', tokoData.alamat);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await onSave(toko.tokoId, formData);
      window.location.reload(); // Refresh halaman setelah data berhasil disimpan

      setIsSaving(false);
    };
    return (
      <div className='px-4 sm:px-6 md:px-8 lg:px-10'>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-lg w-full">
          <div className="bg-white p-4 shadow rounded-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Pengaturan Toko</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="image-upload">
                <img
                  src={tokoData.image || '/images/default-toko.png'}
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Toko</label>
                <input
                  type="text"
                  name="nama"
                  value={tokoData.nama}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Provinsi</label>
                  <select
                    type="text"
                    name="provinsi"
                    value={tokoData.provinsi}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="" disabled>Pilih provinsi</option>
                    {provinces.map((provinsi) => (
                      <option key={provinsi} value={provinsi}>{provinsi}</option>
                    ))}
                  </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kota</label>
                <select
                  type="text"
                  name="kota"
                  value={tokoData.kota}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="" disabled>Pilih kota/kabupaten</option>
              {tokoData.provinsi && cities[tokoData.provinsi].map((kota) => (
                <option key={kota} value={kota}>{kota}</option>
              ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={tokoData.deskripsi}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={tokoData.alamat}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`mt-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? 'Processing...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <div>Please log in to edit your profile.</div>;
};

export default SettingToko;
