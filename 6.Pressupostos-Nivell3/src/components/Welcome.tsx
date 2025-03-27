import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-cover bg-[url('src/assets/orange.jpg')] h-screen w-full relative overflow-hidden cursor-none">
      <div
        className="shadow-sm absolute backdrop-blur-sm bg-orange-700/30 rounded-full pointer-events-none z-10"
        style={{
          width: '200px',
          height: '200px',
          top: mousePosition.y - 100,
          left: mousePosition.x - 100,
        }}
      ></div>

      <div className="flex items-center justify-center h-full w-full relative z-20">
        <div className="active:p-14 p-9 hover:p-10 hover:border-2 border-orange-500/30 bg-orange-300/40 hover:bg-orange-300/50 rounded-3xl relative z-30 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.4)]">
          <Link to="calculator" className="active:blur-sm font-bold text-7xl welcome drop-shadow-[0_1.2px_2.2px_rgba(0,3,3,1.8)] text-orange-200">Welcome!</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;