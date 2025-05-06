
import { useState } from 'react';

interface NavigationProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="glass flex items-center p-1 rounded-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentSection === item.id
                ? 'bg-primary text-white'
                : 'hover:bg-muted text-gray-300 hover:text-white'
            }`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
