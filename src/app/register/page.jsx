"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Register = () => {
  const Router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    email: '',
    no_telp: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };

      if (name === 'password' || name === 'confirmPassword') {
        setPasswordsMatch(updatedFormData.password === updatedFormData.confirmPassword);
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/user/loginregister', formData);
      if (response.status === 200) {
        const userId = response.data.user.userId;
        try {
          const notificationResponse = await axios.post('/api/notifications/addnotifications', {
            title: 'Akun berhasil diregistrasi',
            message: 'Akun baru saja diregistrasi.',
            userId: userId,
          });
          if (notificationResponse.status === 200) {
            Router.push('/login');
          }
        } catch (notificationError) {
          alert('Notification failed: ' + (notificationError.response?.data?.error || notificationError.message));
        }
        Router.push('/login');
      }
    } catch (error) {
      setError('Registration failed, Have you registered before? make sure your email/username/telephone number is not the same as another account');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-7xl px-4 md:px-8 lg:px-16">
        <div className={`pt-16 lg:pt-0 flex flex-col gap-4 mb-10 lg:mb-0 lg:w-1/2 text-center lg:text-left transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/">
          <svg
            width="65"
            height="38"
            viewBox="0 0 65 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform transform hover:scale-110 mx-auto lg:mx-0"
          >
            <path
              d="M23.5 0.690466C11.1 3.89047 0 17.4905 0 29.4905C0 35.3905 1.7 37.7905 5.9 37.7905C8.9 37.7905 11 36.1905 11 33.7905C11 32.8905 11.7 29.8905 12.5 26.9905C15.5 16.9905 22.5 11.7905 33 11.7905C44.5 11.7905 50.5 17.6905 53.5 31.9905C54.2 35.6905 56.6 37.7905 59.9 37.7905C64 37.7905 65.1 35.7905 64.9 29.2905C64.4 18.4905 57.3 8.09047 46.5 2.49047C42.1 0.290466 29 -0.809534 23.5 0.690466Z"
              fill="#FFFFFF"
            />
          </svg>
          </Link>
          <h1 className="text-white text-xl font-bold">Selamat Datang!</h1>
          <p className="text-white">Mulai berkontribusi dan beri dampak nyata sekarang juga</p>
        </div>
        <div className={`bg-white p-4 mb-16 lg:mb-0 rounded-lg shadow-md w-full max-w-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-2xl mb-4 text-center">Register</h2>
          {error && <div className="text-red-500 text-left">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
                placeholder="Masukkan nama lengkap anda"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
                placeholder="Masukkan username anda"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
                placeholder="Masukkan Email anda"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Nomor Telepon</label>
              <input
                type="tel"
                name="no_telp"
                value={formData.no_telp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
                placeholder="Masukkan nomor telepon anda"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
                placeholder="Masukkan password anda"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
                placeholder="Tulis kembali konfirmasi password anda"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 focus:outline-none checked:bg-highlight transition-all"
                required
              />
              <label htmlFor="terms" className="text-black text-sm">
                Saya menyetujui syarat dan kebijakan privasi pada web ini
              </label>
            </div>
            <button
              type="submit"
              className={`w-full border border-highlight ease-in-out transition-all bg-white text-highlight font-bold py-2 px-4 rounded-md hover:bg-highlight hover:text-white flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Daftar'
              )}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Sudah punya akun?{' '}
              <Link href="/login" className="text-highlight font-bold transition-all hover:text-black">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
