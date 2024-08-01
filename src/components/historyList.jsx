"use client";
import Image from 'next/image';

const HistoryList = ({ onUlasClick, finish, queue, canceled }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Riwayat Pembelian</h2>
      <div>
        <h3 className="text-md font-semibold mb-2">Selesai</h3>
        {finish.map((item) => (
          <div key={item.orderDetailId} className="border p-4 mb-2">
            <div className="flex items-center gap-4">
              <Image 
                src={item?.product?.image || "/images/products/delivery-box.png"} 
                width={50} 
                height={50} 
                alt={item?.product?.nama || 'default'} 
              />
              <div className="flex-grow">
                <h4 className="font-semibold">{item?.product?.nama}</h4>
                <p className="text-sm">Kuantitas: {item?.kuantitas}</p>
                <p className="text-sm">Harga: Rp.{item?.product?.harga}</p>
                <p className="text-sm">Tanggal: {new Date(item?.date).toLocaleDateString()}</p>
                <p className="text-sm">Order ID: {item?.orderId}</p>
              </div>
              <div className="relative">
                <button
                  className={`border py-2 px-4 rounded ${
                    item.rated
                      ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                      : 'border-green-500 text-green-500 hover:bg-green-100'
                  }`}
                  onClick={() => onUlasClick(item)}
                  disabled={item.rated}
                >
                  Ulas
                </button>
                {item.rated && (
                  <div className="absolute bottom-0 right-0 bg-white border p-2 rounded shadow-lg text-xs text-gray-700 w-64 mt-2" style={{ display: 'none' }}>
                    Anda sudah merating produk ini, silahkan beli lagi
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">Antrian</h3>
        {queue.map((item) => (
          <div key={item.orderDetailId} className="border p-4 mb-2">
            <div className="flex items-center gap-4">
              <Image 
                src={item?.product?.image || "/images/products/delivery-box.png"} 
                width={50} 
                height={50} 
                alt={item?.product?.nama || 'default'} 
              />
              <div className="flex-grow">
                <h4 className="font-semibold">{item?.product?.nama}</h4>
                <p className="text-sm">Kuantitas: {item?.kuantitas}</p>
                <p className="text-sm">Harga: Rp.{item?.product?.harga}</p>
                <p className="text-sm">Tanggal: {new Date(item?.date).toLocaleDateString()}</p>
                <p className="text-sm">Order ID: {item?.orderId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">Dibatalkan</h3>
        {canceled.map((item) => (
          <div key={item.orderDetailId} className="border p-4 mb-2">
            <div className="flex items-center gap-4">
              <Image 
                src={item?.product?.image || "/images/products/delivery-box.png"} 
                width={50} 
                height={50} 
                alt={item?.product?.nama || 'default'} 
              />
              <div className="flex-grow">
                <h4 className="font-semibold">{item?.product?.nama}</h4>
                <p className="text-sm">Kuantitas: {item?.kuantitas}</p>
                <p className="text-sm">Harga: Rp.{item?.product?.harga}</p>
                <p className="text-sm">Tanggal: {new Date(item?.date).toLocaleDateString()}</p>
                <p className="text-sm">Order ID: {item?.orderId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
