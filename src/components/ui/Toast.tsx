import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface ToastProps {
  message: string;
  duration?: number; // Duration in milliseconds
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-transform transform',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
      style={{ transition: 'transform 0.3s ease-in-out' }}
    >
      {message}
    </div>
  );
};

export default Toast;