
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
import { Suspense, lazy, useEffect, useState } from 'react';

// Lazy load the heavy 3D components
const LiveVisitorsComponent = lazy(() => import('@/components/LiveVisitors').then(module => ({ default: module.LiveVisitors })));
const ComputerSetup3DComponent = lazy(() => import('@/components/ComputerSetup3D').then(module => ({ default: module.ComputerSetup3D })));

const Index = () => {
  const { currentTheme } = useTheme();
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  
  useEffect(() => {
    // Check WebGL support on component mount
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        const supported = !!gl;
        
        // Clean up WebGL context
        if (gl && 'getExtension' in gl) {
          const loseContext = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
          if (loseContext) loseContext.loseContext();
        }
        
        return supported;
      } catch (e) {
        console.error("WebGL support check error:", e);
        return false;
      }
    };
    
    setIsWebGLSupported(checkWebGLSupport());
    
    // Create a buffer of resource loading
    const preloadResources = async () => {
      // Preload textures
      const imagesToPreload = [
        '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        '//unpkg.com/three-globe/example/img/earth-topology.png'
      ];
      
      await Promise.all(imagesToPreload.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if an image fails
          img.src = src;
        });
      }));
    };
    
    // Only preload resources if WebGL is supported
    if (checkWebGLSupport()) {
      preloadResources();
    }
  }, []);
  
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
      
      {/* Use Suspense for heavy 3D components */}
      <Suspense fallback={
        <div className="py-12 md:py-20 px-4 bg-slate-900/30 backdrop-blur-sm flex justify-center items-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
            <p className="text-blue-400 text-sm md:text-lg">Loading interactive globe...</p>
          </div>
        </div>
      }>
        <LiveVisitorsComponent />
      </Suspense>
      
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
