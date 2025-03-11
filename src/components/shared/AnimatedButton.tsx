import React from 'react';
import { cn } from '../../lib/utils';

interface AnimatedButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean; // Add the disabled property
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  onClick, 
  children, 
  className,
  disabled = false // Set default value to false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center p-4 text-lg font-medium text-white bg-purple-600 rounded-md overflow-hidden group hover:bg-purple-700 transition-all duration-300",
        disabled && "opacity-50 cursor-not-allowed hover:bg-purple-600", // Apply styles when disabled
        className
      )}
    >
      <span className={cn(
        "absolute inset-0 w-full h-full transition-transform duration-300 transform scale-110 bg-purple-500 rounded-md",
        !disabled && "group-hover:scale-125" // Only apply hover effect when not disabled
      )}></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};