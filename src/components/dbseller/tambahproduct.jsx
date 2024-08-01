import React, { useState } from 'react';
import axios from 'axios';

const TambahProduk = ({ listCategory }) => {
  const [formData, setFormData] = useState({
    image: null,
    nama: '',
    deskripsi: '',
    stok: '',
    harga: '',
    kategori: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-4 md:p-8'>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4 md:p-8 mt-4 md:mt-10">
        <h1 className="text-xl md:text-2xl font-bold mb-6">Tambah Produk</h1>
        <div className="flex flex-col mb-8">
          <div className="w-full sm:w-24 h-32 mb-4 flex items-center justify-center">
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Produk"
                className="object-cover w-full h-full rounded"
              />
            ) : (
              <img
                src="/images/products/delivery-box.png"
                alt="Produk"
                className="object-cover w-full h-full rounded"
              />
            )}
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
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
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Pilih Kategori</option>
            {listCategory.map((kategori) => (
              <option key={kategori} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="Tulis deskripsi produkmu"
          />
        </div>
        <button
          type="submit"
          className={`bg-green-500 w-full text-white px-4 py-2 rounded mt-4 hover:bg-highlight flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Simpan'
          )}
        </button>
      </form>
    </div>
  );
};

export default TambahProduk;
