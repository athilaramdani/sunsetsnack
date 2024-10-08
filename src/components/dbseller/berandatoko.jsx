const BerandaToko = ({toko}) => {
  const totalTerjual = toko?.products?.reduce((total, product) => total + (product.terjual || 0), 0);

   // Mengurutkan produk berdasarkan penjualan terbanyak dan mengambil 3 produk terlaris
   const produkTerlaris = toko?.products
   ?.sort((a, b) => (b.terjual || 0) - (a.terjual || 0))
   .slice(0, 3);

 // Mengurutkan produk berdasarkan rating terbaik dan mengambil 3 produk dengan rating terbaik
 const produkRatingTerbaik = toko?.products
   ?.sort((a, b) => {
     const ratingA = a.reviews?.reduce((total, review) => total + review.rating, 0) / (a.reviews?.length || 1);
     const ratingB = b.reviews?.reduce((total, review) => total + review.rating, 0) / (b.reviews?.length || 1);
     return ratingB - ratingA;
   })
   .slice(0, 3);
    return (
        <div>
          <div className='px-4 sm:px-6 md:px-8 lg:px-10 pt-6'>
              <h1 className='text-xl sm:text-2xl font-bold mb-4'>Beranda</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white shadow-md rounded-md p-4">
                  Total Produk Terjual 
                  <h1 className="text-3xl font-bold">{totalTerjual}</h1>
                </div>
                <div className="bg-white shadow-md rounded-md p-4">
                  Dampak Lingkungan
                  <h1 className="text-3xl font-bold">89</h1>
                </div>
                <div className="bg-white shadow-md rounded-md p-4">
                  Total Secondary Revenue
                  <h1 className="text-3xl font-bold">89</h1>
                </div>
                <div className="bg-white shadow-md rounded-md p-4">
                  Total Produk Terjual
                  <h1 className="text-3xl font-bold">89</h1>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white shadow-md rounded-md p-4">
                  <h2 className="text-2xl font-bold mb-4">🌱 Produk Terlaris</h2>
                  <ul className='flex flex-col gap-4'>
                    {produkTerlaris?.map(product => (
                      <li key={product.productId}>
                      <div className="font-semibold">{product.nama}</div>
                      <div>Terjual: {product.terjual || 0}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-2xl font-bold mb-4">⭐ 3 Rating Terbaik</h2>
                <ul className='flex flex-col gap-4'>
                  {produkRatingTerbaik?.map(product => {
                    const averageRating = (product.reviews?.reduce((total, review) => total + review.rating, 0) / product.reviews?.length) || 0;
                    return (
                      <li key={product.productId}>
                      <div className="font-semibold">{product.nama}</div>
                      <div>Rating: {averageRating.toFixed(2)}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
}

export default BerandaToko; 