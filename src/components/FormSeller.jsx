"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SellerForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: '',
    provinsi: '',
    kota: '',
    alamat: '',
    userId: ''
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/toko/addtoko', {
        method: 'POST',
        body
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      console.log('Form submitted successfully:', result);
      router.push('/dashboard')

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await fetch(`/api/user/userinfo`); // Update with the correct endpoint to get user info
      const user = await response.json();

      if (!response.ok) {
        throw new Error(user.error || 'Failed to fetch user ID');
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: user.id
      }));
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  useEffect(() => {
    fetchUserId();
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/regions');
        const data = await response.json();
        
        const fetchedProvinces = data.map(region => region.provinsi);
        const fetchedCities = data.reduce((acc, region) => {
          acc[region.provinsi] = region.kota;
          return acc;
        }, {});
        
        setProvinces(fetchedProvinces);
        setCities(fetchedCities);
      } catch (error) {
        console.error('Error fetching regions data:', error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="bg-white p-4 w-full shadow rounded-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Jadi Seller</h2>
      <p className="mb-4">Lorem Ipsum dolor sit amet</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Gerai</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Tulis nama geraimu"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Provinsi</label>
          <select
            name="provinsi"
            value={formData.provinsi}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="" disabled>Pilih provinsi</option>
            {provinces.map((provinsi) => (
              <option key={provinsi} value={provinsi}>{provinsi}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kota/Kabupaten</label>
          <select
            name="kota"
            value={formData.kota}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="" disabled>Pilih kota/kabupaten</option>
            {formData.provinsi && cities[formData.provinsi].map((kota) => (
              <option key={kota} value={kota}>{kota}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Tulis alamat geraimu"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md shadow-sm hover:bg-green-600"
        >
          Selanjutnya
        </button>
      </form>
    </div>
  );
};

export default SellerForm;
