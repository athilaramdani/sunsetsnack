import Navbar from '@/components/Navbar/navbar';
import ItemCart from '@/components/itemcart';
import TotalCart from '@/components/totalcart';

const Cart = () => {
    const items = [
        {
          name: 'Bebas',
          description: '78 Item Terdiri dari Protein Hew...',
          price: 'Rp 18.000',
          quantity: 1,
          image: 'https://i.pinimg.com/736x/7b/94/3f/7b943f0ae3902473c07b3b05a6ee8778.jpg', // Ganti dengan path gambar yang sesuai
        },
        {
          name: 'Standard Mystery Pack 1',
          description: '5 Item Terdiri dari Protein Hew...',
          price: 'Rp 18.000',
          quantity: 1,
          image: 'path/to/image', // Ganti dengan path gambar yang sesuai
        },
      ];
    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row gap-6 p-4">
        <div className="flex-grow">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
              <input type="checkbox" className="mr-4" />
              <span>Pilih Semua</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold mb-2">Dunkin Donuts Cabang Pejaten</div>
                <ItemCart item={item} />
              </div>
            ))}
            {items.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold mb-2">JCO Cabang Pejaten</div>
                <ItemCart item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <TotalCart total="Rp 18.000" />
        </div>
      </div>
        </div>
    );
  };
  
  export default Cart;