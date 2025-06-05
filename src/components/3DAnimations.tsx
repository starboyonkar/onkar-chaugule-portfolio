
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  intensity?: number;
  className?: string;
}

export const FloatingElement = ({ 
  children, 
  delay = 0, 
  duration = 3, 
  intensity = 10,
  className = ""
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        x: [0, intensity/2, 0],
        rotateX: [0, 5, 0],
        rotateY: [0, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
};

interface Card3DProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  rotateIntensity?: number;
}

export const Card3D = ({ 
  children, 
  className = "",
  hoverScale = 1.05,
  rotateIntensity = 5
}: Card3DProps) => {
  return (
    <motion.div
      className={`group ${className}`}
      whileHover={{
        scale: hoverScale,
        rotateX: rotateIntensity,
        rotateY: -rotateIntensity,
        z: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxElementProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxElement = ({ 
  children, 
  offset = 50,
  className = ""
}: ParallaxElementProps) => {
  return (
    <motion.div
      className={className}
      initial={{ y: offset, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

interface PerspectiveContainerProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
}

export const PerspectiveContainer = ({ 
  children, 
  className = "",
  perspective = 1000
}: PerspectiveContainerProps) => {
  return (
    <div 
      className={className}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

export const GlowingOrb = ({ size = 4, color = "blue", intensity = 0.5 }) => {
  return (
    <motion.div
      className={`absolute w-${size} h-${size} rounded-full bg-${color}-400 opacity-${Math.floor(intensity * 100)}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [intensity, intensity * 1.5, intensity],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        boxShadow: `0 0 20px rgba(59, 130, 246, ${intensity})`,
        filter: 'blur(1px)',
      }}
    />
  );
};

export const FloatingParticles = ({ count = 5, colors = ['blue', 'purple', 'cyan'] }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => {
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-${color}-400 rounded-full opacity-60`}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        );
      })}
    </>
  );
};
