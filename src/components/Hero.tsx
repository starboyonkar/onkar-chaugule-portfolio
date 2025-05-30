
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    "DevOps Engineer",
    "Cloud Enthusiast", 
    "IoT Innovator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Onkar</span>
          </h1>
          
          <div className="h-16 flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              <span className="text-blue-400 font-semibold transition-all duration-500">
                {texts[currentText]}
              </span>
            </p>
          </div>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate about solving real-world problems with innovative technologies 
            and delivering scalable solutions across industries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              View My Projects
            </button>
            
            <a
              href="/resume.pdf"
              className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-gray-400" size={24} />
        </div>
      </div>
    </section>
  );
};
