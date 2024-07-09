// src/app/login/page.jsx
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const Router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      alert('Login failed: ' + result.error);
    } else {
      alert('Login successful');
      Router.push('/');
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className={`bg-white p-8 rounded-lg shadow-md w-full max-w-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black font-bold py-2">Username/Email/no.Telp</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
              placeholder="Masukkan username/Email/no.telp anda"
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
          <button type="submit" className="w-full border border-highlight ease-in-out transition-all bg-white text-highlight font-bold py-2 px-4 rounded-md hover:bg-highlight hover:text-white">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>Belum punya akun?
            <Link href="/register" className="text-black underline font-bold hover:text-highlight ease-in-out transition-all">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
