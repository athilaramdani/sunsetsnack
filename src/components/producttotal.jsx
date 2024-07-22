import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProductTotal = ({ price, stock,productId }) => {
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!session) {
      alert('Please log in to add items to the cart');
      router.push('/login')
      return;
    }
  
    try {
      const response = await fetch('/api/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          userId: session.user.userId,
          quantity: quantity,  // Menambahkan quantity
        }),
      });
  
      if (response.ok) {
        alert('Item added to cart successfully');
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Atur Jumlah</h2>
      <div className="flex items-center mt-2 mb-4 space-x-2">
        <button className="text-gray-600 hover:text-gray-800" onClick={handleDecrease} disabled={quantity === 1}>-</button>
        <input
          type="text"
          value={quantity}
          className="w-12 text-center mx-2 border border-gray-300 rounded"
          readOnly
        />
        <button className="text-gray-600 hover:text-gray-800" onClick={handleIncrease} disabled={quantity === stock}>+</button>
        <div className="flex justify-between items-center">
          <span>Total Stok Tersedia: </span>
          <span className="font-semibold">{stock}</span>
        </div>
      </div>
      <div className='flex justify-between mb-4'>
        <div>Subtotal</div>
        <div>Rp {price * quantity}</div>
      </div>
      <div className='flex flex-col gap-4'>
        <button className="w-full bg-[#4C956C] text-white py-2 rounded hover:bg-green-600" onClick={handleAddToCart}>
          + Keranjang
        </button>
        <button className="w-full bg-white text-[#4C956C] py-2 border-2 border-[#4C956C] rounded hover:bg-green-600 hover:text-white">
          Beli Langsung
        </button>
      </div>
    </div>
  );
};

export default ProductTotal;
