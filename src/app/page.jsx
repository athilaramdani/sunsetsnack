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
      image: 'https://instagram.fbdo4-1.fna.fbcdn.net/v/t39.30808-6/440456408_18223882720287518_6376668148965592585_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fbdo4-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=0FPCruup94YQ7kNvgGorRsy&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzM2Mzg1NjQ4MDQzNTE4OTMyMQ%3D%3D.2-ccb7-5&oh=00_AYC7Fb2vSLKFFZPb1cxZtcy6MP_N9vsyosIyK5mMw9z6EQ&oe=6692ACD8&_nc_sid=8f1549',
      name: 'lipa cangtik',
      location: 'lipa unchhhh',
      rating: '5/5',
      normalPrice: '99.000',
      discountPrice: '999.999.999.000',
      stock: 1,
    },
    {
      image: 'https://i.pinimg.com/736x/49/04/f6/4904f69ebd9a928b74ffb9aa4f38ea0c.jpg',
      name: 'jangan tanya saya kalo ini',
      location: 'aduh',
      rating: '5/5',
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
