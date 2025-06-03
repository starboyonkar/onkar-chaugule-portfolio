import { useState, useEffect } from 'react';
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Mail, Instagram, Youtube, X } from 'lucide-react';
export const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const texts = ["DevOps Engineer", "Cloud Enthusiast", "IoT Developer"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };
  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/117c0e0f-e3ee-4663-ae57-fed86ea856fa.png';
    link.download = 'Onkar_Chaugule_Resume.png';
    link.click();
  };
  const socialLinks = [{
    icon: Github,
    href: "https://github.com/starboyonkar",
    label: "GitHub",
    color: "hover:text-gray-900 hover:bg-white"
  }, {
    icon: Linkedin,
    href: "https://linkedin.com/in/onkar-chaugule",
    label: "LinkedIn",
    color: "hover:text-blue-600 hover:bg-blue-100"
  }, {
    icon: Mail,
    href: "mailto:onkarchougule501@gmail.com",
    label: "Gmail",
    color: "hover:text-red-600 hover:bg-red-100"
  }, {
    icon: Instagram,
    href: "https://instagram.com/onkar.chougule.73",
    label: "Instagram",
    color: "hover:text-pink-600 hover:bg-pink-100"
  }, {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCpzZr2eg1lsB6yALzsBTUlQ",
    label: "YouTube",
    color: "hover:text-red-600 hover:bg-red-100"
  }];
  return <>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)] animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delay"></div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float" style={{
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + i}s`
        }}></div>)}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            {/* Profile Image with Experience Badge */}
            <div className="relative animate-slide-left" style={{
            animationDelay: '0.2s'
          }}>
              <div className="w-48 h-48 mx-auto relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <img alt="Onkar Chaugule" className="relative w-full h-full object-cover rounded-full border-4 border-blue-500/20 shadow-2xl" src="https://i.postimg.cc/90P5wRnB/image-0-985e3c46.png" />
                {/* Experience Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg border-2 border-white animate-pulse">
                  1+ Years Experience
                </div>
              </div>
            </div>

            {/* Personalized Greeting */}
            <div className="animate-fade-in" style={{
            animationDelay: '0.4s'
          }}>
              <h1 className="text-4xl md:text-5xl font-light text-gray-300 mb-2">
                Hello, I'm
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                  Onkar Chaugule
                </span>
              </h2>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 animate-fade-in" style={{
            animationDelay: '0.6s'
          }}>
              {socialLinks.map((social, index) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`group w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color}`} style={{
              animationDelay: `${0.7 + index * 0.1}s`
            }}>
                  <social.icon size={20} className="transition-colors duration-300" />
                </a>)}
            </div>

            {/* Role headline with glowing border */}
            <div className="relative animate-fade-in" style={{
            animationDelay: '0.8s'
          }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <div className="h-16 flex items-center justify-center">
                  <p className="text-xl md:text-3xl text-gray-300 font-light">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold transition-all duration-500">
                      {texts[currentText]}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{
            animationDelay: '1s'
          }}>
              Passionate engineering graduate specialized in{' '}
              <span className="text-blue-400 font-semibold">cloud automation</span>,{' '}
              <span className="text-purple-400 font-semibold">DevOps</span>, and{' '}
              <span className="text-blue-400 font-semibold">IoT systems</span>. 
              Experienced in real-world deployments, containerization, and scalable app architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in" style={{
            animationDelay: '1.2s'
          }}>
              <button onClick={scrollToProjects} className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink size={20} />
                  View Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button onClick={openResumeModal} className="group relative px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <Download size={20} />
                Download Resume
                <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
              </button>
            </div>
          </div>

          {/* Animated scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
              </div>
              <ArrowDown className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      {isResumeModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeResumeModal} />
          
          {/* Modal */}
          <div className="relative bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-semibold text-white">Resume Preview</h3>
                <p className="text-gray-400">Onkar Chaugule - DevOps Engineer</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleResumeDownload} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors duration-300">
                  <Download size={16} />
                  Download
                </button>
                <button onClick={closeResumeModal} className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Resume Image */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <img src="/lovable-uploads/117c0e0f-e3ee-4663-ae57-fed86ea856fa.png" alt="Onkar Chaugule Resume" className="w-full h-auto rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>}
    </>;
};