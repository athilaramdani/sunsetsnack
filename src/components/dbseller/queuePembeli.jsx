import React from 'react';

const QueuePembeli = ({ queue, onDoneClick, onCancelClick }) => {
  // Group orders by user name
  const groupedQueue = queue.reduce((acc, order) => {
    const userName = order.user.nama;
    if (!acc[userName]) {
      acc[userName] = [];
    }
    acc[userName].push(...order.orderDetails.filter(detail => detail.status === 'queue'));
    return acc;
  }, {});

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 h-screen pt-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Queue</h1>
      <div className="bg-white p-4 shadow rounded-lg mb-4">
        {Object.keys(groupedQueue).map(userName => (
          <div key={userName} className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">{userName}</span>
            </div>
            {groupedQueue[userName].map(orderDetail => (
              <div key={orderDetail.orderDetailId} className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="flex justify-center">
                  <img
                    src={orderDetail.product.image || "/images/products/delivery-box.png"}
                    alt={orderDetail.product.nama}
                    className="w-28 h-28 rounded-md md:mr-2"
                  />
                </div>
                <div>
                  <div className="flex-grow">
                    <div className="flex justify-center md:justify-start">
                      <h3 className="text-lg font-semibold">{orderDetail.product.nama}</h3>
                    </div>
                    <p className="text-sm text-gray-700">Quantity: {orderDetail.kuantitas}</p>
                    <p className="text-xs text-gray-500">Order Detail ID: {orderDetail.orderDetailId}</p>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onClick={() => onDoneClick(orderDetail.orderDetailId)}
                    >
                      Done
                    </button>
                    <button
                      className="border border-red-500 text-red-500 py-2 px-4 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => onCancelClick(orderDetail.orderDetailId)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueuePembeli;
