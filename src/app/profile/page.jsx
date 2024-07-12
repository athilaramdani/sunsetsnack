"use client";
import Navbar from '@/components/Navbar/navbar';
import ProfileCard from '@/components/profilecard';
import SettingProfile from '@/components/SettingProfile';
import History from '@/components/historylist';
import Seller from '@/components/FormSeller';
import { useState, useEffect } from 'react';
import GoToDashboardSeller from '@/components/gotodashboardseller';

const Profile = () => {
  const [selectedPage, setSelectedPage] = useState('profile');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/userinfo`);
        const user = await response.json();

        if (!response.ok) {
          throw new Error(user.error || 'Failed to fetch user');
        }

        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const renderContent = () => {
    if (!user) {
      return <div>Loading...</div>;
    }

    switch (selectedPage) {
      case 'history':
        return <History />;
      case 'kupon':
        return <>masi belom ada wkwkwk</>;
      case 'seller':
        if (user.role !== "PENJUAL") {
          return <Seller />;
        } else {
          return <GoToDashboardSeller />;
        }
      case 'profile':
      default:
        return <SettingProfile />;
    }
  };

  return (
    <div>
      <Navbar />
        <div className='max-w-screen-2xl mx-auto'>
          <div className="flex flex-col md:flex-row gap-6 p-4">
            <div className="w-full md:w-1/4">
              <ProfileCard onMenuItemClick={setSelectedPage} />
            </div>
            <div className="flex-grow">
              {renderContent()}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;
