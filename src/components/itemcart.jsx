import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ItemCart = ({ item }) => {
  const { data: session, status } = useSession();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    if (quantity === 0) {
      const removeItem = async () => {
        try {
          const response = await fetch('/api/cart/removefromcart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: item.product.productId, // Menggunakan productId dari item
              userId: session.user.userId,
            }),
          });

          if (response.ok) {
            window.location.reload();
          } else {
            const data = await response.json();
          }
        } catch (error) {
          console.error('Failed to remove product from cart:', error);
        }
      };

      removeItem();
    }
  }, [quantity, item.product.productId, session.user.userId]);

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch('/api/cart/removefromcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.product.productId,
          userId: session.user.userId,
        }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        console.error('Failed to remove product from cart:', data.message);
      }
    } catch (error) {
      console.error('Failed to remove product from cart:', error);
    }
  };

  const handlePlusToCart = async () => {
    if (!session) {
      alert('Please log in to add items to the cart');
      router.push('/login');
      return;
    }
    setQuantity(quantity + 1);

    try {
      const response = await fetch('/api/cart/addtocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.product.productId, // Menggunakan productId dari item
          userId: session.user.userId,
          quantity : 1,
        }),
      });

      if (response.ok) {
         // Update state quantity secara lokal
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleMinusToCart = async () => {
  
    if (quantity > 1) {
      setQuantity(quantity - 1); 
      if (!session) {
        alert('Please log in to add items to the cart');
        router.push('/login');
        return;
      }// Update state quantity secara lokal
      try {
        const response = await fetch('/api/cart/addtocart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: item.product.productId, // Menggunakan productId dari item
            userId: session.user.userId,
            quantity : -1,
          }),
        });
  
        if (response.ok) {
        } else {
          const data = await response.json();
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Failed to subtract product from cart:', error);
        alert('Failed to subtract product from cart');
      }
    };

    
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <input type="checkbox" className="mr-4" />
      <img src={item.product.image} alt={item.product.nama} className="w-16 h-16 rounded mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.product.nama}</h3>
        <p className="text-gray-500 text-sm">{item.product.deskripsi}</p>
        <div className="flex items-center mt-2">
          <button className="text-gray-600 hover:text-gray-800" onClick={handleMinusToCart} disabled={quantity === 1}>-</button>
          <input
            type="text"
            value={quantity}
            className="w-12 text-center mx-2 border border-gray-300 rounded"
            readOnly
          />
          <button className="text-gray-600 hover:text-gray-800" onClick={handlePlusToCart}>+</button>
          <div className="flex items-center space-x-2 ml-4">
            <button className="text-gray-500 hover:text-red-500">
              <FontAwesomeIcon icon={faHeart}/>
            </button>
            <button className="text-gray-500 hover:text-red-500" onClick={handleRemoveFromCart}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">Rp {item.product.harga * quantity}</p>
      </div>
    </div>
  );
};

export default ItemCart;
