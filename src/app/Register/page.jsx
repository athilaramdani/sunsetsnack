"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Register = () => {
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
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/user', formData);
      if (response.status === 200) {
        alert('Registration successful');
        // Redirect to login page
      }
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.error || error.message));
    }
  };

  const isFormValid = () => {
    return (
      formData.nama.trim() !== '' &&
      formData.username.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.no_telp.trim() !== '' &&
      formData.password !== '' &&
      formData.confirmPassword !== '' &&
      passwordsMatch &&
      document.getElementById('terms')?.checked
    );
  };

  return (
    <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-7xl">
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-200 p-2 mx-10">
          <img src="/logo.png" alt="Logo" className="max-w-xs" />
        </div>
        <div className={`bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2 transition-opacity duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl mb-4 text-center">Register</h2>
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
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 focus:outline-none checked:bg-highlight transition-all"
              />
              <label htmlFor="terms" className="text-black text-sm">
                Saya menyetujui syarat dan kebijakan privasi pada web ini
              </label>
            </div>
            <button
              type="submit"
              className={`w-full border border-highlight ease-in-out transition-all bg-white text-highlight font-bold py-2 px-4 rounded-md hover:bg-highlight hover:text-white ${
                isFormValid() ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isFormValid()}
            >
              Daftar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Sudah punya akun?{' '}
              <Link href="/login" className="text-black underline font-bold hover:text-highlight ease-in-out transition-all">
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
