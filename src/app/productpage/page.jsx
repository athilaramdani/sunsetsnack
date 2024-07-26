"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar/navbar';
import ProductTotal from '@/components/producttotal';
import ReviewCard from '@/components/reviewcard';
import Link from 'next/link';
import Image from 'next/image';

const ProductPage = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState(null);  // Perbaikan: Mendefinisikan dengan benar

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/infoproducts?productId=${productId}`);
          if (!response.ok) {
            throw new Error('Product not found');
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/user/userinfo`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("data user sebelum di fetch", data)
          setUser(data);
        } catch (error) {
          console.log("cannot show username");
        }
      };

      fetchUser();
    }
  }, [session, status]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchCart = async () => {
        try {
          const response = await fetch('/api/cart/getcart', {
            headers: {
              'user-id': session.user.userId, // Menggunakan userId dari sesi
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCarts(data.cartItems);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };

      fetchCart();
    }
  }, [session, status]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar user={user} carts={carts} />
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-16 lg:px-32 xl:px-40 pt-24">
        <div className="flex-shrink-0">
          <Image 
            className="object-cover" 
            src={product.image || "/images/products/delivery-box.png"} 
            width={400} 
            height={400} 
            alt={product.nama}
          />
        </div>
        <div className="flex-grow flex flex-col md:w-2/4">
          <div>
            <h1 className='font-bold'>{product.nama}</h1>
            <div className='flex gap-4 items-center mt-2'>
              <p className='font-semibold'>Rp. {product.harga}</p>
              <p className='font-regular text-xs'>⭐ {product.rating}</p>
              <p className='font-regular text-xs'>{product.reviews.length} Reviews</p>
              <p className='font-regular text-xs'>Terjual&gt;{product.terjual} paket</p>
            </div>
            <div className='mt-8'>
              <h1 className='font-bold'>Tentang Paket</h1>
              <p className='font-regular'>{product.deskripsi}</p>
            </div>
            <Link href={`/geraidetail?tokoId=${product.toko.id}`} className='flex gap-4 items-center mt-8'>
              <div>Logo</div>
              <div className='text-left'>
                <h1 className='font-bold'>{product.toko.nama}</h1>
                <p className='font-regular'>Official Branch</p>
              </div>
            </Link>
            <div className='mt-8'>
              <h1 className='font-bold'>Review dan Rating</h1>
              <div className='mt-8'>
                {product.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <ProductTotal price={product.harga} stock={product.stok} productId={productId}/>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
