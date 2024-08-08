import React from 'react';

const DeleteConfirmation = () => {
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus produk ini?</p>
          <div className="flex justify-end">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Batal
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmation ;