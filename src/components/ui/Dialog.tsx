import React from 'react';
import { cn } from '../../lib/utils';

interface DialogProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 z-10 transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{content}</p>
        <button
          className={cn("btn-primary", "w-full")}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Dialog;