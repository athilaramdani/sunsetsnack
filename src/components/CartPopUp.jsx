"use client";
import CartItem from '@/components/CartContent';

const CartPopUp = ({ carts }) => {
  const limitedCarts = carts.slice(0, 2); // Batasi jumlah item menjadi 2

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Keranjang</h1>
        <a href="/keranjang" className="text-green-600 hover:text-green-800">Lihat Semua</a>
      </div>
      {limitedCarts && limitedCarts.length > 0 ? (
        limitedCarts.map((item) => (
          <CartItem
            key={item.cartItemId}
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