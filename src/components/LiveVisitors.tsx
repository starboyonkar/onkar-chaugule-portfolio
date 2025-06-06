import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { Eye, Users, Globe as GlobeIcon } from 'lucide-react';
import * as THREE from 'three';

interface VisitorData {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  timestamp: number;
}

interface VisitorStats {
  totalToday: number;
  liveNow: number;
  countries: number;
}

export const LiveVisitors = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);
  
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState<VisitorStats>({
    totalToday: 0,
    liveNow: 0,
    countries: 0
  });
  const [recentVisitor, setRecentVisitor] = useState<VisitorData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      const isTouchDevice = 'ontouchstart' in window;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      setIsMobile(width < 768 || isTouchDevice || isMobileUA);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize enhanced globe with comprehensive mobile optimizations
  useEffect(() => {
    if (!globeRef.current) return;

    setIsLoading(true);

    // Create globe instance with mobile-optimized settings - using 'new' keyword
    const globe = new Globe(globeRef.current)
      .width(globeRef.current.offsetWidth)
      .height(isMobile ? 300 : 450)
      .backgroundColor('rgba(0,0,0,0)')
      .enablePointerInteraction(true);

    // Enhanced renderer configuration for mobile compatibility
    const renderer = globe.renderer();
    if (renderer) {
      // Set appropriate pixel ratio for device
      const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
      renderer.setPixelRatio(pixelRatio);
      
      // Configure for mobile performance
      renderer.shadowMap.enabled = !isMobile;
      renderer.shadowMap.type = isMobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap;
    }

    // Enhanced globe material and textures with mobile optimization
    globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .showGlobe(true)
      .showAtmosphere(!isMobile) // Disable atmosphere on mobile for performance
      .atmosphereColor('#4A90E2')
      .atmosphereAltitude(0.15);

    // Conditional features based on device capability
    if (!isMobile) {
      globe.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
    }

    // Custom globe material with enhanced properties
    const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
    if (globeMaterial) {
      globeMaterial.bumpScale = isMobile ? 3 : 8;
      globeMaterial.shininess = isMobile ? 0.05 : 0.1;
    }

    // Enhanced controls with mobile optimization
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = isMobile ? 0.2 : 0.4;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = isMobile ? 120 : 180;
      controls.maxDistance = isMobile ? 350 : 500;
      controls.enableDamping = true;
      controls.dampingFactor = isMobile ? 0.1 : 0.05;
      controls.maxPolarAngle = Math.PI * 0.9;
      controls.minPolarAngle = Math.PI * 0.1;
    }

    // Store globe instance
    globeInstance.current = globe;

    // Enhanced interaction handlers
    const handleInteractionStart = () => {
      setIsHovered(true);
      if (controls) controls.autoRotate = false;
    };

    const handleInteractionEnd = () => {
      setIsHovered(false);
      setTimeout(() => {
        if (controls && !isHovered) controls.autoRotate = true;
      }, 1000);
    };

    const globeElement = globeRef.current;
    
    // Universal event listeners for all devices
    globeElement.addEventListener('mouseenter', handleInteractionStart);
    globeElement.addEventListener('mouseleave', handleInteractionEnd);
    globeElement.addEventListener('touchstart', handleInteractionStart);
    globeElement.addEventListener('touchend', handleInteractionEnd);

    // Loading complete
    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      globeElement.removeEventListener('mouseenter', handleInteractionStart);
      globeElement.removeEventListener('mouseleave', handleInteractionEnd);
      globeElement.removeEventListener('touchstart', handleInteractionStart);
      globeElement.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isHovered, isMobile]);

  // Setup real-time visitor tracking with enhanced animations
  useEffect(() => {
    const trackCurrentUser = async () => {
      try {
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        
        if (data.status === 'success') {
          const currentUser: VisitorData = {
            id: Math.random().toString(36).substr(2, 9),
            country: data.country,
            city: data.city,
            lat: data.lat,
            lng: data.lon,
            timestamp: Date.now()
          };

          setVisitors(prev => [...prev, currentUser]);
          updateGlobePoints([currentUser]);
          
          setTimeout(() => {
            const demoVisitors = generateDemoVisitors();
            setVisitors(prev => [...prev, ...demoVisitors]);
            updateGlobePoints(demoVisitors);
            updateStats(demoVisitors.length + 1);
          }, 2000);
        }
      } catch (error) {
        console.log('Using demo data for visitor tracking');
        const demoData = generateDemoVisitors();
        setVisitors(demoData);
        updateGlobePoints(demoData);
        updateStats(demoData.length);
      }
    };

    trackCurrentUser();
  }, []);

  // Generate demo visitors for demonstration
  const generateDemoVisitors = (): VisitorData[] => {
    const demoLocations = [
      { country: 'India', city: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { country: 'USA', city: 'New York', lat: 40.7128, lng: -74.0060 },
      { country: 'UK', city: 'London', lat: 51.5074, lng: -0.1278 },
      { country: 'Germany', city: 'Berlin', lat: 52.5200, lng: 13.4050 },
      { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      { country: 'Australia', city: 'Sydney', lat: -33.8688, lng: 151.2093 },
      { country: 'Canada', city: 'Toronto', lat: 43.6532, lng: -79.3832 },
      { country: 'Brazil', city: 'São Paulo', lat: -23.5505, lng: -46.6333 },
      { country: 'France', city: 'Paris', lat: 48.8566, lng: 2.3522 },
      { country: 'South Korea', city: 'Seoul', lat: 37.5665, lng: 126.9780 }
    ];

    // Limit demo visitors on mobile for performance
    const maxVisitors = isMobile ? 6 : 10;
    return demoLocations.slice(0, maxVisitors).map((location, index) => ({
      id: `demo-${index}`,
      ...location,
      timestamp: Date.now() - Math.random() * 3600000
    }));
  };

  // Update globe with enhanced visitor points and animations
  const updateGlobePoints = (newVisitors: VisitorData[]) => {
    if (!globeInstance.current) return;

    const points = newVisitors.map(visitor => ({
      lat: visitor.lat,
      lng: visitor.lng,
      size: isMobile ? Math.random() * 0.4 + 0.3 : Math.random() * 0.6 + 0.4,
      color: '#00BFFF',
      city: visitor.city,
      country: visitor.country
    }));

    globeInstance.current
      .pointsData(points)
      .pointAltitude(isMobile ? 0.1 : 0.15)
      .pointColor('color')
      .pointRadius('size')
      .pointResolution(isMobile ? 12 : 24)
      .pointLabel(d => `
        <div style="
          background: rgba(0, 0, 0, 0.9); 
          color: #00BFFF; 
          padding: ${isMobile ? '4px 6px' : '6px 10px'}; 
          border-radius: 6px; 
          border: 1px solid #00BFFF;
          font-family: 'Inter', sans-serif;
          font-size: ${isMobile ? '11px' : '13px'};
          box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
          white-space: nowrap;
        ">
          📍 ${d.city}, ${d.country}
        </div>
      `);

    // Optimized rings for mobile
    const shouldShowRings = !isMobile || newVisitors.length <= 4;
    if (shouldShowRings) {
      globeInstance.current
        .ringsData(newVisitors.map(visitor => ({
          lat: visitor.lat,
          lng: visitor.lng
        })))
        .ringColor(() => '#00BFFF')
        .ringMaxRadius(isMobile ? 2 : 3)
        .ringPropagationSpeed(isMobile ? 0.8 : 1.2)
        .ringRepeatPeriod(isMobile ? 4000 : 2500)
        .ringAltitude(0.03);
    }

    // Show recent visitor notification
    if (newVisitors.length > 0) {
      const latest = newVisitors[newVisitors.length - 1];
      setRecentVisitor(latest);
      setTimeout(() => setRecentVisitor(null), 4000);
    }
  };

  // Update statistics
  const updateStats = (visitorCount: number) => {
    const uniqueCountries = new Set(visitors.map(v => v.country)).size;
    setStats({
      totalToday: visitorCount,
      liveNow: Math.floor(visitorCount * 0.3),
      countries: uniqueCountries
    });
  };

  // Handle window resize with mobile optimization
  useEffect(() => {
    const handleResize = () => {
      if (globeInstance.current && globeRef.current) {
        const newIsMobile = window.innerWidth < 768;
        globeInstance.current
          .width(globeRef.current.offsetWidth)
          .height(newIsMobile ? 300 : 450);
      }
    };

    const debouncedResize = (() => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleResize, 100);
      };
    })();

    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  return (
    <section className="py-12 md:py-20 px-4 bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent p-2 md:p-4 rounded-xl backdrop-blur-md">
            Live Visitors Around the World
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 px-4">
            You're not alone—others are exploring too! 🌍
          </p>
          
          {/* Enhanced Stats Cards with mobile optimization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-slate-900/50 backdrop-blur-md p-4 md:p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/40 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
                <Eye className="text-blue-400" size={isMobile ? 18 : 24} />
                <span className="text-xl md:text-2xl font-bold text-white">{stats.totalToday}</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Visitors Today</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-4 md:p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
                <Users className="text-cyan-400" size={isMobile ? 18 : 24} />
                <span className="text-xl md:text-2xl font-bold text-white">{stats.liveNow}</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Live Now</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-4 md:p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
                <GlobeIcon className="text-purple-400" size={isMobile ? 18 : 24} />
                <span className="text-xl md:text-2xl font-bold text-white">{stats.countries}</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Countries</p>
            </div>
          </div>
        </div>

        {/* Enhanced Globe Container with mobile optimization */}
        <div className="relative">
          <div className="bg-slate-900/20 backdrop-blur-md rounded-2xl p-3 md:p-6 border border-blue-500/20 overflow-hidden shadow-2xl">
            {/* Loading overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
                  <p className="text-blue-400 font-mono text-sm md:text-lg">Loading Globe...</p>
                </div>
              </div>
            )}

            {/* Globe with enhanced container styling */}
            <div 
              ref={globeRef} 
              className={`w-full ${isMobile ? 'h-[300px]' : 'h-[450px]'} rounded-xl overflow-hidden relative cursor-pointer transform-gpu`}
              style={{ 
                background: 'radial-gradient(circle at center, rgba(0, 191, 255, 0.08) 0%, rgba(0, 0, 0, 0.95) 100%)',
                boxShadow: `
                  inset 0 0 ${isMobile ? '30px' : '50px'} rgba(0, 191, 255, 0.15),
                  0 0 ${isMobile ? '50px' : '100px'} rgba(0, 191, 255, 0.08)
                `
              }}
            />
            
            {/* Enhanced glow overlay */}
            <div className="absolute inset-3 md:inset-6 rounded-xl pointer-events-none bg-gradient-to-t from-cyan-500/5 via-transparent to-blue-500/5"></div>
            
            {/* Status indicator */}
            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 bg-slate-800/90 backdrop-blur-md text-cyan-400 px-2 md:px-3 py-1 rounded-lg text-xs border border-cyan-500/30">
              {isHovered ? '⏸️ Paused' : '🌍 Auto-rotating'}
            </div>
          </div>
          
          {/* Enhanced Recent Visitor Notification */}
          {recentVisitor && (
            <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-gradient-to-r from-cyan-600/95 to-blue-600/95 backdrop-blur-md text-white px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-lg animate-fade-in border border-cyan-400/40 max-w-[280px] md:max-w-none">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-xs md:text-sm font-semibold">
                  👋 New visitor from {recentVisitor.city}, {recentVisitor.country}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Instructions */}
        <div className="text-center mt-6 md:mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-400 text-xs md:text-sm mb-2 px-4">
            {isMobile ? '👆 Touch and drag to rotate • 🤏 Pinch to zoom • ✨ Watch for live visitor pings' : '🖱️ Click and drag to rotate • 🔍 Scroll to zoom • ✨ Watch for live visitor pings'}
          </p>
          <p className="text-cyan-400 text-xs px-4">
            {isMobile ? 'Touch the globe to pause auto-rotation • Tap points for location details' : 'Hover over the globe to pause auto-rotation • Click points for location details'}
          </p>
        </div>
      </div>
    </section>
  );
};
