import React from 'react';
import { cn } from '../../lib/utils';

interface AnimatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center p-4 text-lg font-medium text-white bg-purple-600 rounded-md overflow-hidden group hover:bg-purple-700 transition-all duration-300",
        className
      )}
    >
      <span className="absolute inset-0 w-full h-full transition-transform duration-300 transform scale-110 bg-purple-500 rounded-md group-hover:scale-125"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};