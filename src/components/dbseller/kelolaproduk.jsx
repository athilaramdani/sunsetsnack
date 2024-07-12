import ProductCard from "../ProductCardSeller";

const KelolaProduk = ({products, onMenuItemClick}) => {
    return (
        <div>
            <div className='px-10 pt-6'>
                    <h1 className='text-2xl font-bold mb-4'>Kelola Produk</h1>
            </div>
            <div className='px-10 flex justify-between w-[1200px] pt-8'>
                <div className='flex flex-col justify-center'>
                    <h1 className="text-2xl font-medium mb-4">🌱 Produk Terlaris</h1>
                    <p className="text-lg mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div>
                    <button className='w-48 h-15 px-6 py-4 bg-[#4C956C] text-white rounded-xl' onClick={() => onMenuItemClick('tambahproduk')}>Tambah Produk</button>
                </div>
            </div>
            <div className='pl-10 pt-4 gap-8 flex flex-row'>
            {products.map((product) => (
              <ProductCard 
              product={product}
              />
            ))}
            </div>
            
          </div>
    )
}

export default KelolaProduk;