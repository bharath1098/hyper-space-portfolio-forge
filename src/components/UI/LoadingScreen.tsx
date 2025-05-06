
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 5;
        clearInterval(interval);
        return 100;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-space-dark z-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold neon-text mb-6">LOADING PORTFOLIO</h1>
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-gray-400 font-mono">Initializing 3D Environment {progress}%</p>
    </div>
  );
};

export default LoadingScreen;
