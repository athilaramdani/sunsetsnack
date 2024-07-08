import Navbar from '@/components/Navbar/navbar';
import Content from '@/components/Content/content';
import Footer from '@/components/Footer/footer';
import MPCard from '@/components/mpcard';

const Home = () => {
  const cardsData = [
    {
      image: '/images/pedro.jpg',
      name: 'Special Mystery Pack 1',
      location: 'Dunkin Donuts Cabang Kemang',
      rating: '4.3/5',
      normalPrice: '40.000',
      discountPrice: '15.000',
      stock: 4,
    },
    {
      image: '/images/pedro.jpg',
      name: 'Special Mystery Pack 1',
      location: 'Dunkin Donuts Cabang Kemang',
      rating: '4.3/5',
      normalPrice: '40.000',
      discountPrice: '15.000',
      stock: 4,
    },
    {
      image: '/images/pedro.jpg',
      name: 'Special Mystery Pack 1',
      location: 'Dunkin Donuts Cabang Kemang',
      rating: '4.3/5',
      normalPrice: '40.000',
      discountPrice: '15.000',
      stock: 4,
    },
    {
      image: 'https://i.pinimg.com/736x/49/04/f6/4904f69ebd9a928b74ffb9aa4f38ea0c.jpg',
      name: 'Special Mystery Pack 1',
      location: 'Dunkin Donuts Cabang Kemang',
      rating: '4.3/5',
      normalPrice: '40.000',
      discountPrice: '15.000',
      stock: 4,
    },
    {
      image: '/images/pedro.jpg',
      name: 'Special Mystery Pack 1',
      location: 'Dunkin Donuts Cabang Kemang',
      rating: '4.3/5',
      normalPrice: '40.000',
      discountPrice: '15.000',
      stock: 4,
    },
  ];
  const contentData = [
    {
      judul: '🌱 Yuk, Segera Selamatkan!',
      desc: 'Mulai beri dampak nyata dari sekarang'
    }
  ];
  return (
    <div>
      <Navbar />
      <div className='p-8'>
        {contentData.map((content, index) => (
          <div key={index}>
            <Content judul={content.judul} desc={content.desc} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardsData.map((card, index) => (
                <MPCard key={index} {...card} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
