"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const Router = useRouter();
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let identifierType = '';

    if (/^\d+$/.test(formData.identifier)) {
      identifierType = 'phone';
    } else if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.identifier)) {
      identifierType = 'email';
    } else {
      identifierType = 'username';
    }

    const result = await signIn('credentials', {
      redirect: false,
      identifier: formData.identifier,
      identifierType,
      password: formData.password,
    });

    if (result?.error) {
      setError(true);
      setIsLoading(false);
    } else {
      Router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl: '/' });
    if (signInResponse && !signInResponse.error) {
      Router.push('/');
    } else {
      setError(true)
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        <div className={`bg-white p-4 rounded-lg shadow-md w-full max-w-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          {error && <div className="text-red-500 text-left">username dan password salah</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black font-bold py-2">Username/Email/no.Telp</label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
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
                'Login'
              )}
            </button>
          </form>
        
          <div className="mt-4 text-center">
            <p>Belum punya akun?
              <Link href="/register" className="text-black underline font-bold hover:text-highlight ease-in-out transition-all"> Daftar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
