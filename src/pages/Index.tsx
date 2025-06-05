
import { Hero } from '@/components/Hero';
import { LiveVisitors } from '@/components/LiveVisitors';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Certifications } from '@/components/Certifications';
import { CertificationGoals } from '@/components/CertificationGoals';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { DevConsole } from '@/components/DevConsole';
import { ThemeSelector } from '@/components/ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { PerspectiveContainer, FloatingParticles } from '@/components/3DAnimations';

const Index = () => {
  const { currentTheme } = useTheme();
  
  return (
    <PerspectiveContainer className="min-h-screen transition-all duration-500 relative overflow-hidden">
      {/* Enhanced 3D background with floating elements */}
      <div 
        className="min-h-screen transition-all duration-500 relative"
        style={{ 
          background: currentTheme.colors.background 
        }}
      >
        {/* Global floating particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <FloatingParticles count={15} colors={['blue', 'purple', 'cyan', 'pink']} />
          
          {/* Additional 3D geometric shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 border border-blue-400/20 rounded-lg"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, -360],
                rotateZ: [0, 180],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5,
              }}
              style={{
                left: `${5 + i * 11}%`,
                top: `${10 + (i % 4) * 20}%`,
                transformStyle: 'preserve-3d',
              }}
            />
          ))}
        </div>

        {/* Enhanced section animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navigation />
          <ThemeSelector />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <LiveVisitors />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <About />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Projects />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Certifications />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Education />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CertificationGoals />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <DevConsole />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Contact />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Footer />
        </motion.div>
      </div>
    </PerspectiveContainer>
  );
};

export default Index;
