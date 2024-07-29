import React from 'react';

const QueuePembeli = ({ queue, onDoneClick, onCancelClick }) => {
  const groupedQueue = queue.reduce((acc, order) => {
    const userName = order.user.nama;
    if (!acc[userName]) {
      acc[userName] = [];
    }
    acc[userName].push(...order.orderDetails.filter((detail) => detail.status === 'queue'));
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      {Object.keys(groupedQueue).map((userName) => (
        <div key={userName} className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600">{userName}</div>
          </div>
          {groupedQueue[userName].map((orderDetail) => (
            <div key={orderDetail.orderDetailId} className="flex items-center mb-2">
              <img
                src={orderDetail.product.image || "/images/products/delivery-box.png"}
                alt={orderDetail.product.nama}
                className="w-16 h-16 rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{orderDetail.product.nama}</h3>
                <p>Quantity: {orderDetail.kuantitas}</p>
                <p>Order Detail ID: {orderDetail.orderDetailId}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={() => onDoneClick(orderDetail.orderDetailId)}
                >
                  Done
                </button>
                <button
                  className="border border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-100"
                  onClick={() => onCancelClick(orderDetail.orderDetailId)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QueuePembeli;
