"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import ProductCard from '@/components/ProductCardSeller';
import SettingForm from '@/components/SettingProfile';
import BerandaToko from '@/components/dbseller/berandatoko';
import KelolaProduk from '@/components/dbseller/kelolaproduk';
import TambahProduk from '@/components/dbseller/tambahproduct';
import QueuePembeli from '@/components/dbseller/queuePembeli';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [selectedPage, setSelectedPage] = useState('beranda');
  const [toko, setToko] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchQueue = async () => {
        try {
          const response = await fetch('/api/pembayaran/getpembayarantokopage', {
            headers: {
              'user-id': session.user.userId,
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setQueue(data);
        } catch (error) {
          console.error('Error fetching queue:', error);
        }
      };

      fetchQueue();
    }
  }, [session, status]);

  const handleDoneClick = async (orderDetailId) => {
    try {
      const response = await fetch('/api/orderdetail/finished', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetailId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedQueue = queue.map((item) =>
        item.orderDetailId === orderDetailId ? { ...item, status: 'finish' } : item
      );

      setQueue(updatedQueue);
      window.location.reload();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div className="md:hidden p-4">
        <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" onClick={toggleSidebar} />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
      )}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onMenuItemClick={(page) => {
          setSelectedPage(page);
          setIsSidebarOpen(false);
        }}
        judul={toko ? toko.nama : "SideBar"}
      />
      <div className="flex-grow px-4 bg-gray-100">
        {selectedPage === 'beranda' && <BerandaToko toko={toko} />}
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
        {selectedPage === 'queue' && <QueuePembeli queue={queue} onDoneClick={handleDoneClick} />}
      </div>
    </div>
  );
};

export default Dashboard;