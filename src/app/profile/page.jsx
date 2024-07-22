"use client";

import Navbar from '@/components/Navbar/navbar';
import ProfileCard from '@/components/profilecard';
import SettingProfile from '@/components/SettingProfile';
import History from '@/components/historylist';
import Seller from '@/components/FormSeller';
import GoToDashboardSeller from '@/components/gotodashboardseller';
import UlasForm from '@/components/ulasform'; // Import the UlasForm component
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session, status } = useSession();
  const [selectedPage, setSelectedPage] = useState('profile');
  const [user, setUser] = useState(null);
  const [showUlasForm, setShowUlasForm] = useState(false);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/userinfo`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user');
        }

        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleShowUlasForm = () => {
    setShowUlasForm(true);
  };

  const handleCloseUlasForm = () => {
    setShowUlasForm(false);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchCart = async () => {
        try {
          const response = await fetch('/api/cart/getcart', {
            headers: {
              'user-id': session.user.userId, // Menggunakan userId dari sesi
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCarts(data.cartItems);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };

      fetchCart();
    }
  }, [session, status]);

  return (
    <div>
      <Navbar carts={carts}/>
      <div className='max-w-screen-2xl mx-auto'>
        <div className="flex flex-col md:flex-row gap-6 p-4">
          <div className="w-full md:w-1/4">
            <ProfileCard onMenuItemClick={setSelectedPage} />
          </div>
          <div className="flex-grow">
            {user === null ? (
              <div>Loading...</div>
            ) : (
              <>
                {selectedPage === 'history' && (
                  <>
                    <History onUlasClick={handleShowUlasForm} />
                    {showUlasForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="flex justify-center flex-col bg-white p-4 rounded">
                          <UlasForm />
                          <button
                            className=" mt-4 bg-red-500 text-white py-2 px-4 rounded"
                            onClick={handleCloseUlasForm}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedPage === 'kupon' && <>Maaf tapi anda belum mempunyai kupon untuk saat ini</>}
                {selectedPage === 'seller' && user.role !== "PENJUAL" && <Seller />}
                {selectedPage === 'seller' && user.role === "PENJUAL" && <GoToDashboardSeller />}
                {selectedPage === 'profile' && <SettingProfile />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
