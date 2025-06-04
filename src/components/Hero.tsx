
import { useState, useEffect } from 'react';
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Mail, Instagram, Youtube, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { ComputerSetup3D } from './ComputerSetup3D';
import { AnimatedProfile } from './AnimatedProfile';

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

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_50%)]"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.15),transparent_50%)]"
            animate={{ 
              opacity: [0.3, 0.1, 0.3],
              scale: [1.1, 1, 1.1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* 3D floating elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delay"></div>
          
          {/* Enhanced floating particles with 3D effect */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
              style={{
                left: `${20 + i * 8}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Enhanced Profile Image with 3D Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <AnimatedProfile />
            </motion.div>

            {/* Personalized Greeting with enhanced animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-light text-gray-300 mb-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Hello, I'm
              </motion.h1>
              <motion.h2 
                className="text-5xl md:text-6xl font-bold text-white mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                  Onkar Chaugule
                </span>
              </motion.h2>
            </motion.div>

            {/* Enhanced Social Icons with 3D effects */}
            <motion.div 
              className="flex justify-center space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 flex items-center justify-center transition-all duration-300 ${social.color}`}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    rotateY: 15,
                    boxShadow: "0 10px 25px rgba(74, 144, 226, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <social.icon size={20} className="transition-colors duration-300" />
                </motion.a>
              ))}
            </motion.div>

            {/* Role headline with enhanced 3D effects */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur-lg opacity-30"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
                <div className="h-16 flex items-center justify-center">
                  <motion.p 
                    className="text-xl md:text-3xl text-gray-300 font-light"
                    key={currentText}
                    initial={{ opacity: 0, y: 20, rotateX: -30 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                      {texts[currentText]}
                    </span>
                  </motion.p>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced description */}
            <motion.p 
              className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Passionate engineering graduate specialized in{' '}
              <span className="text-blue-400 font-semibold">cloud automation</span>,{' '}
              <span className="text-purple-400 font-semibold">DevOps</span>, and{' '}
              <span className="text-blue-400 font-semibold">IoT systems</span>. 
              Experienced in real-world deployments, containerization, and scalable app architecture.
            </motion.p>

            {/* 3D Computer Setup Integration */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="mt-12"
            >
              <ComputerSetup3D />
            </motion.div>

            {/* Enhanced action buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button
                onClick={scrollToProjects}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold overflow-hidden shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(74, 144, 226, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink size={20} />
                  View Projects
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              
              <motion.button
                onClick={openResumeModal}
                className="group relative px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Download size={20} />
                Download Resume
                <motion.div 
                  className="absolute inset-0 bg-blue-400 opacity-0 rounded-lg"
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Enhanced animated scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center space-y-2">
              <motion.div 
                className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-1 h-2 bg-gray-400 rounded-full mt-2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <ArrowDown className="text-gray-400" size={20} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Resume Modal */}
      {isResumeModalOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={closeResumeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          
          {/* Modal */}
          <motion.div 
            className="relative bg-slate-900 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div>
                <h3 className="text-xl font-semibold text-white">Resume Preview</h3>
                <p className="text-gray-400">Onkar Chaugule - DevOps Engineer</p>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleResumeDownload}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={16} />
                  Download
                </motion.button>
                <motion.button
                  onClick={closeResumeModal}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
            
            {/* Resume Image */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <motion.img
                src="/lovable-uploads/117c0e0f-e3ee-4663-ae57-fed86ea856fa.png"
                alt="Onkar Chaugule Resume"
                className="w-full h-auto rounded-lg shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
