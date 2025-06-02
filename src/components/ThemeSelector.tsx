
import React from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme, themes } from '@/contexts/ThemeContext';

export const ThemeSelector = () => {
  const { currentTheme, setTheme, isThemeSelectorOpen, toggleThemeSelector } = useTheme();

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    toggleThemeSelector();
  };

  return (
    <div className="fixed top-20 right-4 z-50">
      {/* Paint Palette Trigger Button */}
      <button
        onClick={toggleThemeSelector}
        className="group relative w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-600 hover:border-slate-500 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
        aria-label="Theme Selector"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Palette 
          size={20} 
          className="absolute inset-0 m-auto text-gray-300 group-hover:text-white transition-colors duration-300" 
        />
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
      </button>

      {/* Theme Selector Dropdown */}
      {isThemeSelectorOpen && (
        <div className="absolute top-16 right-0 w-80 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl animate-scale-in">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-700">
            <h3 className="text-white font-semibold text-lg font-futuristic">
              Choose Theme
            </h3>
            <button
              onClick={toggleThemeSelector}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Theme Options */}
          <div className="p-4 space-y-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`w-full flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-800/50 ${
                  currentTheme.id === theme.id ? 'bg-slate-800 border border-slate-600' : ''
                }`}
              >
                {/* Color Preview */}
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>

                {/* Theme Name */}
                <span className="text-white font-medium flex-1 text-left">
                  {theme.name}
                </span>

                {/* Active Indicator */}
                {currentTheme.id === theme.id && (
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <p className="text-gray-400 text-sm text-center">
              Theme will be saved for your next visit
            </p>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isThemeSelectorOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={toggleThemeSelector}
        />
      )}
    </div>
  );
};
