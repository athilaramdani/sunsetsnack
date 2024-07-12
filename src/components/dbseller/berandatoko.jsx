const BerandaToko = () => {
    return (
        <div className='pt-6'>
      <h1 className="text-3xl font-bold mb-4">Beranda</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-md p-4">Total Produk Terjual: 89</div>
        <div className="bg-white shadow-md rounded-md p-4">Dampak Lingkungan: 89</div>
        <div className="bg-white shadow-md rounded-md p-4">Total Secondary Revenue: 89</div>
        <div className="bg-white shadow-md rounded-md p-4">Total Produk Terjual: 89</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-2xl font-bold mb-4">🌱 Produk Terlaris</h2>
          {/* Produk Terlaris List */}
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-2xl font-bold mb-4">⭐ 3 Rating Terbaik</h2>
          {/* Produk Terlaris List */}
        </div>
      </div>
    </div>
    )
}

export default BerandaToko;