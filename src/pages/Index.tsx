
import { Hero } from '@/components/Hero';
import { LiveVisitors } from '@/components/LiveVisitors';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Certifications } from '@/components/Certifications';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { DevConsole } from '@/components/DevConsole';
import { AIAvatarWrapper } from '@/components/AIAvatarWrapper';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navigation />
      <Hero />
      <LiveVisitors />
      <AIAvatarWrapper />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Education />
      <DevConsole />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
