import React from 'react';

const ReviewCard = ({ review }) => {
  const { rating, komentar, user, image } = review;
  const images = image ? image.split(',') : [];

  return (
    <div className="border rounded-lg p-4 bg-white shadow mt-4">
      <div className="flex items-center">
        <img
          src={user?.image || "/images/userdefault.jpg"}
          alt={user?.nama}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <p className="font-semibold">{user?.nama}</p>
          <p className="text-sm text-gray-600">Rating: {rating}</p>
        </div>
      </div>
      <p className="mt-4">{komentar}</p>
      {images.length > 0 && (
        <div className="mt-4 flex flex-wrap">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Review image ${index}`} className="w-32 h-32 mr-2 mb-2" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
