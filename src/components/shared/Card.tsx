import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  image?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children,
  className,
  title,
  description,
  image,
  onClick 
}) => {
  return (
    <div
      className={cn("bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105", 
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {image && <img src={image} alt={title || "Card image"} className="rounded-t-lg" />}
      <div className="p-4">
        {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
        {description && <p className="text-gray-300">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export { Card };