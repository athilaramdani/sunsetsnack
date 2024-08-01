import Link from 'next/link';

const Footer = () => {
    return (
      <footer>
        <div className="bg-gray-100 flex items-center h-28 md:h-32 justify-between px-4 md:px-16">
          <div className="flex gap-4 items-center">
            <svg
                width="65"
                height="38"
                viewBox="0 0 65 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform transform hover:scale-110"
              >
                <path
                  d="M23.5 0.690466C11.1 3.89047 0 17.4905 0 29.4905C0 35.3905 1.7 37.7905 5.9 37.7905C8.9 37.7905 11 36.1905 11 33.7905C11 32.8905 11.7 29.8905 12.5 26.9905C15.5 16.9905 22.5 11.7905 33 11.7905C44.5 11.7905 50.5 17.6905 53.5 31.9905C54.2 35.6905 56.6 37.7905 59.9 37.7905C64 37.7905 65.1 35.7905 64.9 29.2905C64.4 18.4905 57.3 8.09047 46.5 2.49047C42.1 0.290466 29 -0.809534 23.5 0.690466Z"
                  fill="#406B40"
                />
              </svg>
              <div>
                <h1 className="font-bold md:text-xl text-[#406B40]">Sunset Snack</h1>
                <p className="text-sm md:text-base text-[#406B40]">Bandung-Indonesia</p>
              </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="md:text-xl text-[#406B40]">Created by</h1>
            <p className="text-xs md:text-base text-[#406B40]">Team D--CCIHack</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;