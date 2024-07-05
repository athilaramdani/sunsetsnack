import Navbar from '@/components/Navbar/navbar';

const Register = () => {
  return (
    <>
      <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan nama lengkap anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan username anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nomor Telepon</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan nomor telepon anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
             
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Masukkan password anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
             
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Tulis kembali konfirmasi password anda"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Daftar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>Sudah punya akun? <a href="/login" className="text-green-500 hover:underline">Masuk</a></p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Register;
