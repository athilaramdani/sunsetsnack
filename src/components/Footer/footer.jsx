import Link from 'next/link';

const Footer = () => {
    return (
      <footer className="bg-gray-100 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-around text-gray-700">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Sunset Snack</h2>
              <ul>
                {/* <li className="mb-2"><a href="#" className="hover:underline">Tentang Kami</a></li> */}
                {/* <li className="mb-2"><a href="#" className="hover:underline">Hak kekayaan intelektual</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li> */}
              </ul>
            {/* </div>
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Bantuan dan Panduan</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:underline">Syarat dan ketentuan</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Kebijakan privasi</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Bantuan</a></li>
              </ul> */}
            </div>
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:underline"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#" className="hover:underline"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#" className="hover:underline"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
            {/* <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Anda memiliki usaha FnB?</h3>
              <button className="bg-green-200 text-black px-4 py-2 rounded hover:bg-green-300">Daftar sebagai mitra</button>
              <a href="#" className="block mt-2 text-blue-500 hover:underline">Informasi lebih lanjut</a>
            </div> */}
          </div>
        </div>
        <div className="bg-green-300 text-black py-4 mt-10">
          <div className="max-w-7xl mx-auto text-center">
            <p>©Sunset Snack, 2024. ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;