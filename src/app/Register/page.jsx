import Navbar from '@/components/Navbar/navbar';

const Register = () => {
  return (
    <>
      <div className="bg-primary flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-4 text-center">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-black font-bold py-2">Nama Lengkap</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
              placeholder="Masukkan nama lengkap anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-bold py-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
              placeholder="Masukkan username anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-bold py-2">Email</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
              placeholder="Masukkan Email anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-bold py-2">Nomor Telepon</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
              placeholder="Masukkan nomor telepon anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-bold py-2 font-normal">Password</label>
            <input
              type="password"
             
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight bg-placeholder placeholder:text-sm transition-all"
              placeholder="Masukkan password anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black  font-bold py-2">Konfirmasi Password</label>
            <input
              type="password"
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
          <button type="submit" className="w-full border border-highlight ease-in-out transition-all bg-white text-highlight font-bold py-2 px-4 rounded-md hover:bg-highlight hover:text-white">
            Daftar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>Sudah punya akun? <a href="/login" className="text-black underline hover:text-highlight ease-in-out transition-all">Masuk</a></p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Register;
