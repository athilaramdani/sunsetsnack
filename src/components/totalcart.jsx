import React, { useEffect, useState } from 'react';

const TotalCart = ({ items, handlePayment }) => {
  const [selectedTotal, setSelectedTotal] = useState('Rp 0');

  useEffect(() => {
    const calculateSelectedTotal = () => {
      const selectedItems = items.filter(item => item.checked);
      const total = selectedItems.reduce((sum, item) => sum + item.product.harga * item.quantity, 0);
      setSelectedTotal(`Rp ${total}`);
    };

    calculateSelectedTotal();
  }, [items]);

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Ringkasan Belanja</h2>
      <div className="flex justify-between mb-4">
        <span>Total</span>
        <span className="font-semibold">{selectedTotal}</span>
      </div>
      <button
        onClick={handlePayment}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Bayar
      </button>
    </div>
  );
};

export default TotalCart;
