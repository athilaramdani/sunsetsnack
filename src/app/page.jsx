  "use client"
  import { useEffect, useState } from 'react';
  import Navbar from '@/components/Navbar/navbar';
  // import Content from '@/components/Content/content';
  import Footer from '@/components/Footer/footer';
  import MPCard from '@/components/mpcard';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


  const Home = () => {
    const [cardsData, setCardsData] = useState([]);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerPage = 5;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCardsData(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchData();
    }, []);

    const handleNext = () => {
      if (currentIndex < cardsData.length - cardsPerPage) {
        setCurrentIndex(currentIndex + cardsPerPage);
      }
    };

    const handlePrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - cardsPerPage);
      }
    };

    const displayedCards = cardsData.slice(currentIndex, currentIndex + cardsPerPage);

    return (
      <div>
        <div className='fixed top-0 left-0 w-full z-50'>
          <Navbar />
        </div>
        <div className='pt-32 pb-24 max-w-screen-2xl mx-auto p-8'>
          <div>
            <h1 className="text-2xl font-bold mb-4">🌱 Yuk, Segera Selamatkan!</h1>
            <p className="text-lg mb-8">Mulai beri dampak nyata dari sekarang</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {cardsData.map((card) => (
              <MPCard 
                key={card.id}
                image={card.image || "/images/products/delivery-box.png"}
                name={card.nama}
                location={card.deskripsi}
                rating={4.5}
                normalPrice={card.harga}
                discountPrice={card.harga * 0.9}
                stock={card.stok}
              />
            ))}
          </div>
        </div>
        <div className='bg-[#4C956C]'>
          <div className='p-12 bg-[#C8DED1] rounded-bl-[100px] rounded-tr-[100px]'>
            <div className='max-w-screen-2xl mx-auto'>
            <div>
              <h1 className="text-2xl font-bold mb-4">🌱 Penawaran Menarik!</h1>
              <p className="text-lg mb-8">Menu oke, dengan penawaran menarik</p>
            </div>
            <div className="flex justify-between items-center ">
              <button onClick={handlePrevious} disabled={currentIndex === 0} className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400">
              &lt;
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-4 flex-grow">
                {displayedCards.map((card) => (
                  <MPCard 
                    key={card.id}
                    image={card.image || "/images/products/delivery-box.png"}
                    name={card.nama}
                    location={card.deskripsi}
                    rating={4.5}
                    normalPrice={card.harga}
                    discountPrice={card.harga * 0.9}
                    stock={card.stok}
                  />
                ))}
              </div>
              <button onClick={handleNext} disabled={currentIndex >= cardsData.length - cardsPerPage} className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400">
              &gt;
              </button>
            </div>
            </div>

            <div className='flex justify-center pt-8'>
              <button className='bg-[#A8C4B4] px-32 py-4 rounded-xl text-[#2C6E49] font-bold'>Lihat Semua</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  export default Home;
