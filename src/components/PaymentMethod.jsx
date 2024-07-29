"use client";
import React, { useState } from 'react';

const PaymentMethod = ({ total, onPay }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await onPay();
      setSuccess('Pembayaran berhasil!');
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-6">Pembayaran</h1>
      <h2 className="text-lg font-semibold mb-4">Pilih Metode Pembayaran</h2>
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Transfer Bank</h3>
        <div className="space-y-2">
          {['Mandiri', 'BNI', 'BRI', 'BCA'].map((bank) => (
            <div
              key={bank}
              className={`flex items-center p-2 border 'border-green-500' rounded`}
            >
              <div className='flex'>
                <img src={`/images/${bank.toLowerCase()}.png`} alt={bank} className="w-6 h-6 mr-3" />
                <span className="flex-grow">Transfer Bank {bank}</span>
                <input type="radio" name="payment" className="form-radio" readOnly />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">E-Wallet</h3>
        <div className="space-y-2">
          {['Gopay', 'Dana', 'LinkAja'].map((wallet) => (
            <div
              key={wallet}
              className={`flex items-center p-2 border 'border-green-500' rounded cursor-pointer`}
            >
              <img src={`/images/${wallet.toLowerCase()}.png`} alt={wallet} className="w-6 h-6 mr-3" />
              <span className="flex-grow">{wallet}</span>
              <input type="radio" name="payment" className="form-radio" readOnly />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <div className="flex justify-between mb-2">
          <span>Total Belanja</span>
          <span>{total}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Tagihan</span>
          <span>{total}</span>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      <button
        className={`w-full bg-green-500 text-white py-2 px-4 rounded mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Bayar'}
      </button>
    </div>
  );
};

export default PaymentMethod;
