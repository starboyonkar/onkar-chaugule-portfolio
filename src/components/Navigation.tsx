import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // Apply theme immediately
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.setProperty('--background', '222.2 84% 4.9%');
      root.style.setProperty('--foreground', '210 40% 98%');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222.2 84% 4.9%');
    }
  }, [darkMode]);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const navItems = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Skills',
    href: '#skills'
  }, {
    name: 'Projects',
    href: '#projects'
  }, {
    name: 'Certifications',
    href: '#certifications'
  }, {
    name: 'Education',
    href: '#education'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-blue-500/20' : 'bg-transparent'} ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-white relative group">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-puls">InnoVerse by Onkar</span>
            
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => <a key={item.name} href={item.href} className={`${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-all duration-300 relative group text-sm font-medium`} style={{
            animationDelay: `${index * 100}ms`
          }}>
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-blue-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
              </a>)}
            
            {/* Enhanced Dark Mode Toggle */}
            <button onClick={toggleTheme} className={`relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${darkMode ? 'bg-slate-800/50 hover:bg-slate-700/50 text-yellow-400' : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-700'} border-2 ${darkMode ? 'border-slate-600' : 'border-gray-300'}`}>
              <div className="relative w-5 h-5">
                <Sun size={20} className={`absolute inset-0 transition-all duration-300 ${darkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon size={20} className={`absolute inset-0 transition-all duration-300 ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleTheme} className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-slate-800/50 hover:bg-slate-700/50 text-yellow-400' : 'bg-gray-200/50 hover:bg-gray-300/50 text-gray-700'}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} p-2 transition-colors duration-300`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className={`md:hidden ${darkMode ? 'bg-slate-800/95' : 'bg-white/95'} backdrop-blur-md rounded-lg mt-2 p-4 border ${darkMode ? 'border-slate-700/50' : 'border-gray-200/50'} animate-fade-in`}>
            {navItems.map((item, index) => <a key={item.name} href={item.href} className={`block py-3 ${darkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-slate-700/30' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100/30'} transition-colors duration-300 rounded-lg px-3`} onClick={() => setIsOpen(false)} style={{
          animationDelay: `${index * 50}ms`
        }}>
                {item.name}
              </a>)}
          </div>}
      </div>
    </nav>;
};