
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

const Index = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ 
        background: currentTheme.colors.background 
      }}
    >
      <Navigation />
      <ThemeSelector />
      <Hero />
      <LiveVisitors />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <CertificationGoals />
      <DevConsole />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
