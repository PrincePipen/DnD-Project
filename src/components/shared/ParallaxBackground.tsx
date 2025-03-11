import React from 'react';

const ParallaxBackground: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(/src/assets/images/backgrounds/your-background-image.jpg)' }} />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default ParallaxBackground;