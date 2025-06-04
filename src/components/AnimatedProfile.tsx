
import { motion } from 'framer-motion';
import { useState } from 'react';

export const AnimatedProfile = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-48 h-48 mx-auto group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute -inset-8 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, #4A90E2, #8B5CF6, #06B6D4, #4A90E2)',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main profile container */}
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [0, -10, 0],
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotateY: {
            duration: 0.3
          }
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Profile image */}
        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/20 shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            alt="Onkar Chaugule"
            className="w-full h-full object-cover"
            src="/lovable-uploads/5fb4c618-afe3-441b-847e-50606de2f9e7.png"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(74, 144, 226, 0.3))'
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full" />
        </motion.div>
        
        {/* Floating particles around profile */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              top: `${20 + Math.sin(i * Math.PI / 3) * 40}%`,
              left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
      
      {/* Experience Badge with 3D effect */}
      <motion.div
        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg border-2 border-white"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.5 }}
        whileHover={{ 
          scale: 1.1, 
          rotateZ: 5,
          boxShadow: "0 0 25px rgba(74, 144, 226, 0.5)"
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.span
          animate={{ 
            textShadow: isHovered ? "0 0 10px rgba(255,255,255,0.5)" : "none"
          }}
        >
          1+ Years Experience
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
