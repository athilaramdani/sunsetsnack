"use client";

import Navbar from '@/components/Navbar/navbar';
import ProfileCard from '@/components/profilecard';
import SettingProfile from '@/components/SettingProfile';
import History from '@/components/historyList';
import Seller from '@/components/FormSeller';
import GoToDashboardSeller from '@/components/gotodashboardseller';
import UlasForm from '@/components/ulasForm';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const dynamic = "force-static";

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedPage, setSelectedPage] = useState('profile');
  const [user, setUser] = useState(null);
  const [showUlasForm, setShowUlasForm] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [carts, setCarts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [finish, setFinish] = useState([]);
  const [queue, setQueue] = useState([]);
  const [canceled, setCanceled] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('/api/notifications/getnotifications', {
            headers: {
              'user-id': session.user.userId,
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setNotifications(data.notifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();

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

      const fetchPembelian = async () => {
        try {
          const response = await fetch('/api/pembayaran/getpembayaranuserpage', {
            headers: {
              'user-id': session.user.userId,
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          const finish = [];
          const queue = [];
          const canceled = [];

          data.forEach(order => {
            order.orderDetails.forEach(detail => {
              if (detail.status === 'finish') {
                finish.push({ ...detail, date: order.tanggalPesanan, orderId: order.orderId });
              } else if (detail.status === 'queue') {
                queue.push({ ...detail, date: order.tanggalPesanan, orderId: order.orderId });
              } else if (detail.status === 'canceled') {
                canceled.push({ ...detail, date: order.tanggalPesanan, orderId: order.orderId });
              }
            });
          });

          setFinish(finish);
          setQueue(queue);
          setCanceled(canceled);
        } catch (error) {
          console.error('Error fetching pembelian:', error);
        }
      };

      fetchPembelian();
    }
  }, [session, status]);

  const handleShowUlasForm = (orderDetail) => {
    setSelectedOrderDetail(orderDetail);
    setShowUlasForm(true);
  };

  const handleCloseUlasForm = () => {
    setShowUlasForm(false);
    setSelectedOrderDetail(null);
  };

  const handleUlasFormSubmit = async (formData) => {
    try {
      const response = await fetch('/api/reviews/addreviews', {
        method: 'POST',
        body: formData,
        headers: {
          'user-id': session.user.userId,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Review submitted successfully:', data);
        handleCloseUlasForm();
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Error submitting review:', errorData);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null; // Return null while redirecting to avoid flickering
  }

  return (
    <div>
      <Navbar carts={carts} user={user} notifications={notifications} onMenuItemClick={setSelectedPage}/>
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
                    <History
                      onUlasClick={handleShowUlasForm}
                      finish={finish}
                      queue={queue}
                      canceled={canceled}
                    />
                    {showUlasForm && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="flex justify-center flex-col bg-white p-4 rounded">
                          <UlasForm 
                            orderDetail={selectedOrderDetail} 
                            userId={session.user.userId} 
                            onClose={handleCloseUlasForm} 
                            onSubmit={handleUlasFormSubmit} 
                          />
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
