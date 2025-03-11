import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, onClick }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {image && <img src={image} alt={title} className="rounded-t-lg" />}
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default Card;