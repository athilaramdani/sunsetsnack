import ProductCard from "../ProductCardSeller";

const KelolaProduk = ({ products, onMenuItemClick }) => {
    return (
        <div>
            <div className='px-4 sm:px-6 md:px-8 lg:px-10 pt-6'>
                <h1 className='text-xl sm:text-2xl font-bold'>Kelola Produk</h1>
                <div className='flex flex-col lg:flex-row pt-8 justify-between'>
                <div className='flex flex-col mb-4 md:mb-0'>
                    <h1 className="text-xl sm:text-2xl font-medium mb-2">🌱 Produk Terlaris</h1>
                    <p className="text-base sm:text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <button className='w-min h-12 px-4 md:px-6 py-2 md:py-4 hover:bg-highlight bg-green-500 text-white rounded-xl flex items-center text-center whitespace-nowrap' onClick={() => onMenuItemClick('tambahproduk')}>
                    Tambah Produk
                </button>
            </div>
            <div className='pt-4 flex flex-col gap-8 lg:items-center'>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                    />
                ))}
            </div>
        </div>
        </div>
    );
}

export default KelolaProduk;
