"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import ProductCard from '@/components/ProductCardSeller';
import SettingForm from '@/components/SettingProfile';
import BerandaToko from '@/components/dbseller/berandatoko';
import KelolaProduk from '@/components/dbseller/kelolaproduk';
import TambahProduk from '@/components/dbseller/tambahproduct';

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState('beranda');
  const [toko, setToko] = useState(null);
  useEffect(() => {
    const fetchToko = async () => {
      try {
        const response = await fetch(`/api/toko/gettoko`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch toko");
        }

        setToko(data);
      } catch (error) {
        console.error("Error fetching toko:", error);
      }
    };

    fetchToko();
  }, []);
  console.log(toko)
  return (
    <div className="flex ">
      <Sidebar onMenuItemClick={setSelectedPage} judul={toko ? toko.nama : "SideBar"} />
      <div className="flex-grow px-4 bg-gray-100">
        {selectedPage === 'beranda' && <BerandaToko toko={toko}/>}
        {selectedPage === 'kelolaProduk' && (
          toko && toko.products ? 
            <KelolaProduk products={toko.products} onMenuItemClick={setSelectedPage} /> 
            : <div>Loading...</div>
        )}
        {selectedPage === 'profile' && (
          <div>
            <div className='px-10 pt-6'>
              <h1 className='text-2xl font-bold mb-4'>Profile</h1>
            </div>
            <SettingForm />
          </div>
        )}
        {selectedPage === 'tambahproduk' && <TambahProduk />}
      </div>
    </div>
  );
};

export default Dashboard;
