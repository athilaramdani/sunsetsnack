"use client";
import CartItem from '@/components/CartContent';

const CartPopUp = ({ carts }) => {
  const limitedCarts = carts.slice(0, 2); // Batasi jumlah item menjadi 2

  return (
    <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 mt-10 border">
      <div className="flex md:flex-row flex-col justify-between items-center mb-4 gap-2">
        <h1 className="text-lg font-bold mb-4">Keranjang</h1>
        <a href="/keranjang" className="text-green-600 hover:text-green-800 text-sm sm:text-base md:text-lg">Lihat Semua</a>
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
        <p className="text-center text-sm sm:text-base md:text-lg">Keranjang kosong</p>
      )}
    </div>
  );
};

export default CartPopUp;
