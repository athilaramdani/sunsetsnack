import React, { useState } from 'react';
import axios from 'axios';

const TambahProduk = () => {
  const [formData, setFormData] = useState({
    image: null,
    nama: '',
    deskripsi: '',
    stok: '',
    harga: '',
    kategori: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post('/api/products', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        window.location.reload();
      } else {
        alert('Terjadi kesalahan saat menambahkan produk.');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Terjadi kesalahan saat menambahkan produk.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8 mt-10">

      <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>
      <div className="flex flex-col mb-8">
        <div className="w-32 h-32 mb-4">
          {formData.image ? (
            <img src={URL.createObjectURL(formData.image)} alt="Produk" />
          ) : (
            <img src="/images/products/delivery-box.png" alt="Produk" />
          )}
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="bg-green-500 text-white px-4 py-2 rounded flex"
        />
      </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Produk</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Tulis nama produkmu"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Jumlah Stok</label>
          <input
            type="text"
            name="stok"
            value={formData.stok}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Tulis jumlah stok harian produkmu"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Harga</label>
          <input
            type="text"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Tulis harga produkmu"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kategori</label>
          <input
            type="text"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Tulis kategori produkmu"
            required
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Tulis deskripsi produkmu"
          />
      </div>
      <button className="bg-green-500 w-full text-white px-4 py-2 rounded mt-4">
        Simpan
      </button>
      </div>
    </form>
    
  );
};

export default TambahProduk;
