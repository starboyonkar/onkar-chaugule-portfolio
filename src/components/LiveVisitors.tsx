
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

  // Initialize enhanced globe with custom styling
  useEffect(() => {
    if (!globeRef.current) return;

    // Create globe instance with enhanced styling
    const globe = new Globe(globeRef.current)
      .width(globeRef.current.offsetWidth)
      .height(450)
      .backgroundColor('rgba(0,0,0,0)')
      .enablePointerInteraction(true);

    // Enhanced globe material and textures
    globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#4A90E2')
      .atmosphereAltitude(0.25);

    // Custom globe material with enhanced properties
    const globeMaterial = globe.globeMaterial();
    globeMaterial.bumpScale = 10;
    globeMaterial.shininess = 0.1;

    // Enhanced auto-rotate with hover pause
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 200;
      controls.maxDistance = 600;
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    }

    // Store globe instance
    globeInstance.current = globe;

    // Mouse hover handlers for auto-rotation pause
    const handleMouseEnter = () => {
      setIsHovered(true);
      if (controls) controls.autoRotate = false;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (controls) controls.autoRotate = true;
    };

    const globeElement = globeRef.current;
    globeElement.addEventListener('mouseenter', handleMouseEnter);
    globeElement.addEventListener('mouseleave', handleMouseLeave);

    // Touch handlers for mobile
    const handleTouchStart = () => {
      if (controls) controls.autoRotate = false;
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        if (controls && !isHovered) controls.autoRotate = true;
      }, 1000);
    };

    globeElement.addEventListener('touchstart', handleTouchStart);
    globeElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      globeElement.removeEventListener('mouseenter', handleMouseEnter);
      globeElement.removeEventListener('mouseleave', handleMouseLeave);
      globeElement.removeEventListener('touchstart', handleTouchStart);
      globeElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isHovered]);

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

    return demoLocations.map((location, index) => ({
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
      size: Math.random() * 0.8 + 0.5,
      color: '#00BFFF',
      city: visitor.city,
      country: visitor.country
    }));

    globeInstance.current
      .pointsData(points)
      .pointAltitude(0.2)
      .pointColor('color')
      .pointRadius('size')
      .pointResolution(32)
      .pointLabel(d => `
        <div style="
          background: rgba(0, 0, 0, 0.8); 
          color: #00BFFF; 
          padding: 8px 12px; 
          border-radius: 8px; 
          border: 1px solid #00BFFF;
          font-family: 'Orbitron', monospace;
          box-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
        ">
          📍 ${d.city}, ${d.country}
        </div>
      `);

    // Enhanced rings with neon glow effect
    globeInstance.current
      .ringsData(newVisitors.map(visitor => ({
        lat: visitor.lat,
        lng: visitor.lng
      })))
      .ringColor(() => '#00BFFF')
      .ringMaxRadius(4)
      .ringPropagationSpeed(1.5)
      .ringRepeatPeriod(2000)
      .ringAltitude(0.05);

    // Show recent visitor notification with enhanced styling
    if (newVisitors.length > 0) {
      const latest = newVisitors[newVisitors.length - 1];
      setRecentVisitor(latest);
      setTimeout(() => setRecentVisitor(null), 5000);
    }
  };

  // Update statistics
  const updateStats = (visitorCount: number) => {
    const uniqueCountries = new Set(visitors.map(v => v.country)).size;
    setStats({
      totalToday: visitorCount,
      liveNow: Math.floor(visitorCount * 0.25),
      countries: uniqueCountries
    });
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (globeInstance.current && globeRef.current) {
        globeInstance.current
          .width(globeRef.current.offsetWidth)
          .height(Math.min(450, window.innerHeight * 0.6));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-20 px-4 bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-delay"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent glassmorphic-bg p-4 rounded-xl backdrop-blur-md">
            Live Visitors Around the World
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            You're not alone—others are exploring too! 🌍
          </p>
          
          {/* Enhanced Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-blue-500/20 glassmorphic-bg hover:border-blue-400/40 hover:scale-105 transition-all duration-300 will-change-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Eye className="text-blue-400" size={24} />
                <span className="text-2xl font-bold text-white font-futuristic">{stats.totalToday}</span>
              </div>
              <p className="text-gray-400">Visitors Today</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-cyan-500/20 glassmorphic-bg hover:border-cyan-400/40 hover:scale-105 transition-all duration-300 will-change-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="text-cyan-400" size={24} />
                <span className="text-2xl font-bold text-white font-futuristic">{stats.liveNow}</span>
              </div>
              <p className="text-gray-400">Live Now</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 glassmorphic-bg hover:border-purple-400/40 hover:scale-105 transition-all duration-300 will-change-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <GlobeIcon className="text-purple-400" size={24} />
                <span className="text-2xl font-bold text-white font-futuristic">{stats.countries}</span>
              </div>
              <p className="text-gray-400">Countries</p>
            </div>
          </div>
        </div>

        {/* Enhanced Globe Container */}
        <div className="relative">
          <div className="bg-slate-900/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 overflow-hidden shadow-2xl">
            {/* Globe with enhanced container styling and neon glow */}
            <div 
              ref={globeRef} 
              className="w-full h-[450px] rounded-xl overflow-hidden relative cursor-pointer transform-gpu"
              style={{ 
                background: 'radial-gradient(circle at center, rgba(0, 191, 255, 0.05) 0%, rgba(0, 0, 0, 0.95) 100%)',
                boxShadow: `
                  inset 0 0 50px rgba(0, 191, 255, 0.2),
                  0 0 100px rgba(0, 191, 255, 0.1),
                  0 0 200px rgba(74, 144, 226, 0.05)
                `
              }}
            />
            
            {/* Enhanced glow overlay with neon effect */}
            <div className="absolute inset-6 rounded-xl pointer-events-none bg-gradient-to-t from-cyan-500/5 via-transparent to-blue-500/5"></div>
            
            {/* Rotation status indicator */}
            <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-md text-cyan-400 px-3 py-1 rounded-lg text-sm border border-cyan-500/30">
              {isHovered ? '⏸️ Paused' : '🌍 Auto-rotating'}
            </div>
          </div>
          
          {/* Enhanced Recent Visitor Notification */}
          {recentVisitor && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600/90 to-blue-600/90 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in border border-cyan-400/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold">
                  👋 New visitor from {recentVisitor.city}, {recentVisitor.country}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Instructions */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-400 text-sm mb-2">
            🖱️ Click and drag to rotate • 🔍 Scroll to zoom • ✨ Watch for live visitor pings
          </p>
          <p className="text-cyan-400 text-xs">
            Hover over the globe to pause auto-rotation • Tap points for location details
          </p>
        </div>
      </div>
    </section>
  );
};
