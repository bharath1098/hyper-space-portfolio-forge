
import { useState } from 'react';
import { Volume, Volume1, Volume2, VolumeX, Info } from 'lucide-react';

const Controls = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Sound control logic would go here
  };

  return (
    <div className="fixed top-4 right-4 z-10 flex gap-2">
      <button
        className="glass p-2 rounded-full"
        onClick={toggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-gray-300" />
        ) : (
          <Volume2 className="h-5 w-5 text-neon-blue" />
        )}
      </button>
      
      <button
        className="glass p-2 rounded-full relative"
        onClick={() => setShowInfo(!showInfo)}
        title="Information"
      >
        <Info className="h-5 w-5 text-gray-300" />
      </button>
      
      {showInfo && (
        <div className="absolute top-12 right-0 glass p-4 rounded-md w-64">
          <h3 className="text-sm font-bold text-neon-blue mb-2">Controls:</h3>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Click and drag to rotate the view</li>
            <li>• Scroll to zoom in/out</li>
            <li>• Click on navigation buttons to change sections</li>
            <li>• Click on interactive elements for more details</li>
          </ul>
          <button 
            className="mt-3 text-xs text-neon-purple hover:text-neon-blue"
            onClick={() => setShowInfo(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
