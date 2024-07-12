import React from 'react';


const TambahProduk = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Tambah Produk</h1>
      <div className="flex flex-col mb-8">
        <div className="w-32 h-32 mb-4">
          <img src="/images/products/delivery-box.png" alt="Produk" className="" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded flex w-fit">
          Pilih Gambar
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nama Produk</label>
          <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder="Tulis nama produkmu" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Jumlah Stok</label>
          <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder="Tulis jumlah stok harian produkmu" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Harga Normal</label>
          <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder="Tulis harga normal produkmu" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Harga Saat Ini</label>
          <input type="text" className="mt-1 p-2 w-full border border-gray-300 rounded" placeholder="Tulis harga produkmu saat ini" />
        </div>
      </div>
      <button className="bg-green-500 w-full text-white px-4 py-2 rounded mt-4">Simpan</button>
    </div>
  );
};

export default TambahProduk;
