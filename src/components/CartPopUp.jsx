"use client"
import CartItem from '@/components/CartContent';

const CartPopUp = ({ carts }) => {
  console.log("test", carts)
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Keranjang</h1>
        <a href="/keranjang" className="text-green-600 hover:text-green-800">Lihat Semua</a>
      </div>
      {carts && carts.length > 0 ? (
        carts.map((item, index) => (
          <CartItem
            key={item.id}
            image={item.product.image}
            nama={item.product.nama}
            deskripsi={item.product.deskripsi}
            quantity={item.quantity}
            harga={item.product.harga}
          />
        ))
      ) : (
        <p className="text-center">Keranjang kosong</p>
      )}
    </div>
  );
};

export default CartPopUp;
