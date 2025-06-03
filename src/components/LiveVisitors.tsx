import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { Eye, Users, Globe as GlobeIcon, AlertCircle } from 'lucide-react';

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
  const animationFrameRef = useRef<number>();
  
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState<VisitorStats>({
    totalToday: 0,
    liveNow: 0,
    countries: 0
  });
  const [recentVisitor, setRecentVisitor] = useState<VisitorData | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [globeSize, setGlobeSize] = useState({ width: 800, height: 500 });

  // Check WebGL support with enhanced detection
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return false;
      
      // Test basic WebGL functionality
      const shader = gl.createShader(gl.VERTEX_SHADER);
      return !!shader;
    } catch (e) {
      return false;
    }
  };

  // Responsive size calculation
  const calculateGlobeSize = () => {
    if (!globeRef.current) return { width: 800, height: 500 };
    
    const container = globeRef.current.parentElement;
    if (!container) return { width: 800, height: 500 };
    
    const containerWidth = container.offsetWidth;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    let width = containerWidth;
    let height = isMobile ? 400 : isTablet ? 450 : 500;
    
    // Ensure minimum and maximum sizes
    width = Math.max(300, Math.min(width, 1200));
    height = Math.max(300, Math.min(height, 600));
    
    return { width, height };
  };

  // Initialize optimized globe
  useEffect(() => {
    if (!globeRef.current) return;

    if (!checkWebGLSupport()) {
      console.log('WebGL not supported, using fallback visualization');
      setWebglSupported(false);
      setIsLoading(false);
      return;
    }

    try {
      const size = calculateGlobeSize();
      setGlobeSize(size);

      // Create globe with optimized settings
      const globe = new Globe(globeRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .width(size.width)
        .height(size.height)
        .enablePointerInteraction(true);

      // Optimized atmosphere settings
      globe
        .atmosphereColor('#4A90E2')
        .atmosphereAltitude(0.2)
        .showGlobe(true)
        .showAtmosphere(true);

      // Performance optimizations
      const globeMaterial = globe.globeMaterial();
      if (globeMaterial) {
        globeMaterial.shininess = 0.8;
        globeMaterial.transparent = true;
        globeMaterial.opacity = 0.95;
      }

      // Optimized controls
      if (globe.controls) {
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.3; // Reduced for smoother performance
        globe.controls().enableZoom = true;
        globe.controls().enablePan = false;
        globe.controls().minDistance = 200;
        globe.controls().maxDistance = 800;
        globe.controls().enableDamping = true;
        globe.controls().dampingFactor = 0.05;
      }

      // Store globe instance
      globeInstance.current = globe;

      // Optimized interaction handlers
      const handleMouseEnter = () => {
        setIsHovering(true);
        if (globe.controls) {
          globe.controls().autoRotate = false;
        }
      };

      const handleMouseLeave = () => {
        setIsHovering(false);
        if (globe.controls) {
          globe.controls().autoRotate = true;
        }
      };

      const handleTouchStart = () => {
        if (globe.controls) {
          globe.controls().autoRotate = false;
        }
      };

      const handleTouchEnd = () => {
        setTimeout(() => {
          if (globe.controls && !isHovering) {
            globe.controls().autoRotate = true;
          }
        }, 1500);
      };

      globeRef.current.addEventListener('mouseenter', handleMouseEnter);
      globeRef.current.addEventListener('mouseleave', handleMouseLeave);
      globeRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
      globeRef.current.addEventListener('touchend', handleTouchEnd, { passive: true });

      setIsLoading(false);

      return () => {
        if (globeRef.current) {
          globeRef.current.removeEventListener('mouseenter', handleMouseEnter);
          globeRef.current.removeEventListener('mouseleave', handleMouseLeave);
          globeRef.current.removeEventListener('touchstart', handleTouchStart);
          globeRef.current.removeEventListener('touchend', handleTouchEnd);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } catch (error) {
      console.log('Globe initialization failed, using fallback:', error);
      setWebglSupported(false);
      setIsLoading(false);
    }
  }, [isHovering]);

  // Setup real-time visitor tracking with enhanced demo data
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
          if (webglSupported) {
            updateGlobePoints([currentUser]);
          }
          
          // Simulate new visitors for demo
          setTimeout(() => {
            const demoVisitors = generateEnhancedDemoVisitors();
            setVisitors(prev => [...prev, ...demoVisitors]);
            if (webglSupported) {
              updateGlobePoints(demoVisitors);
            }
            updateStats(demoVisitors.length + 1);
          }, 2000);
        }
      } catch (error) {
        console.log('Using enhanced demo data due to API limitation');
        const demoData = generateEnhancedDemoVisitors();
        setVisitors(demoData);
        if (webglSupported) {
          updateGlobePoints(demoData);
        }
        updateStats(demoData.length);
      }
    };

    trackCurrentUser();

    // Set up periodic demo updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 5 seconds
        const newVisitor = generateRandomVisitor();
        setVisitors(prev => [...prev, newVisitor]);
        if (webglSupported) {
          updateGlobePoints([newVisitor]);
        }
        updateStats(visitors.length + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [webglSupported, visitors.length]);

  // Generate enhanced demo visitors
  const generateEnhancedDemoVisitors = (): VisitorData[] => {
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
      { country: 'South Korea', city: 'Seoul', lat: 37.5665, lng: 126.9780 },
      { country: 'Singapore', city: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { country: 'Netherlands', city: 'Amsterdam', lat: 52.3676, lng: 4.9041 }
    ];

    return demoLocations.map((location, index) => ({
      id: `demo-${index}`,
      ...location,
      timestamp: Date.now() - Math.random() * 3600000
    }));
  };

  // Generate random visitor for live updates
  const generateRandomVisitor = (): VisitorData => {
    const locations = [
      { country: 'Russia', city: 'Moscow', lat: 55.7558, lng: 37.6176 },
      { country: 'Mexico', city: 'Mexico City', lat: 19.4326, lng: -99.1332 },
      { country: 'Italy', city: 'Rome', lat: 41.9028, lng: 12.4964 },
      { country: 'Spain', city: 'Madrid', lat: 40.4168, lng: -3.7038 },
      { country: 'China', city: 'Shanghai', lat: 31.2304, lng: 121.4737 }
    ];
    
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...randomLocation,
      timestamp: Date.now()
    };
  };

  // Enhanced globe points with performance optimization
  const updateGlobePoints = (newVisitors: VisitorData[]) => {
    if (!globeInstance.current || !webglSupported) return;

    try {
      const allVisitors = [...visitors, ...newVisitors];
      
      // Limit points for performance
      const maxPoints = 50;
      const limitedVisitors = allVisitors.slice(-maxPoints);
      
      const points = limitedVisitors.map(visitor => ({
        lat: visitor.lat,
        lng: visitor.lng,
        size: Math.random() * 0.6 + 0.3,
        color: '#00FFFF',
        altitude: 0.1
      }));

      globeInstance.current
        .pointsData(points)
        .pointAltitude('altitude')
        .pointColor('color')
        .pointRadius('size')
        .pointResolution(16) // Reduced for better performance
        .pointLabel(d => `<div style="background: rgba(0,0,0,0.9); padding: 6px; border-radius: 4px; color: #00FFFF; border: 1px solid #00FFFF; font-size: 12px;">
          📍 ${limitedVisitors[points.indexOf(d)]?.city}, ${limitedVisitors[points.indexOf(d)]?.country}<br/>
          🕒 ${new Date(limitedVisitors[points.indexOf(d)]?.timestamp).toLocaleTimeString()}
        </div>`);

      // Optimized rings
      globeInstance.current
        .ringsData(newVisitors.slice(-5).map(visitor => ({
          lat: visitor.lat,
          lng: visitor.lng
        })))
        .ringColor(() => '#4A90E2')
        .ringMaxRadius(2)
        .ringPropagationSpeed(1.2)
        .ringRepeatPeriod(1200)
        .ringAltitude(0.01);

      if (newVisitors.length > 0) {
        const latest = newVisitors[newVisitors.length - 1];
        setRecentVisitor(latest);
        setTimeout(() => setRecentVisitor(null), 4000);
      }
    } catch (error) {
      console.log('Error updating globe points:', error);
    }
  };

  // Update statistics
  const updateStats = (visitorCount: number) => {
    const uniqueCountries = new Set(visitors.map(v => v.country)).size;
    setStats({
      totalToday: visitorCount,
      liveNow: Math.floor(visitorCount * 0.25) + Math.floor(Math.random() * 5),
      countries: uniqueCountries
    });
  };

  // Optimized resize handler
  useEffect(() => {
    const handleResize = () => {
      if (globeInstance.current && globeRef.current && webglSupported) {
        const newSize = calculateGlobeSize();
        setGlobeSize(newSize);
        globeInstance.current.width(newSize.width).height(newSize.height);
      }
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [webglSupported]);

  // Debounce helper
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Enhanced fallback visualization
  const FallbackVisualization = () => (
    <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl flex flex-col items-center justify-center border border-blue-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
      
      <div className="text-center space-y-6 relative z-10 px-4">
        <div className="relative">
          <AlertCircle className="mx-auto text-cyan-400 animate-pulse" size={48} />
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping"></div>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white font-futuristic neon-text">
          Global Visitor Network
        </h3>
        <p className="text-gray-300 text-sm md:text-base max-w-md">
          Interactive 3D globe unavailable. Displaying visitor data in optimized mode.
        </p>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
          {visitors.slice(-8).map((visitor) => (
            <div 
              key={visitor.id} 
              className="flex items-center justify-between bg-slate-800/60 backdrop-blur-sm px-3 py-2 rounded-lg text-xs border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                <span className="text-cyan-400 font-medium truncate">
                  {visitor.city}, {visitor.country}
                </span>
              </div>
              <span className="text-gray-400 text-xs">
                {new Date(visitor.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 md:py-20 px-4 bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced section header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent glassmorphic-bg p-6 rounded-xl backdrop-blur-md border border-cyan-500/20">
            Live Visitors Around the World
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Real-time global connectivity visualization 🌍✨
          </p>
          
          {/* Enhanced stats cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-cyan-500/20 glassmorphic-bg hover:border-cyan-400/40 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Eye className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-3xl font-bold text-white font-futuristic">{stats.totalToday}</span>
              </div>
              <p className="text-gray-400">Total Visitors</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-green-500/20 glassmorphic-bg hover:border-green-400/40 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="text-green-400 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-3xl font-bold text-white font-futuristic">{stats.liveNow}</span>
              </div>
              <p className="text-gray-400">Live Now</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 glassmorphic-bg hover:border-purple-400/40 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <GlobeIcon className="text-purple-400 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-3xl font-bold text-white font-futuristic">{stats.countries}</span>
              </div>
              <p className="text-gray-400">Countries</p>
            </div>
          </div>
        </div>

        {/* Optimized globe container */}
        <div className="relative">
          <div className="bg-slate-900/30 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-cyan-500/20 overflow-hidden shadow-2xl">
            {isLoading ? (
              <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
                  <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-cyan-400/30"></div>
                </div>
              </div>
            ) : webglSupported ? (
              <div 
                ref={globeRef} 
                className="w-full rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing"
                style={{ 
                  height: `${globeSize.height}px`,
                  background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
                  boxShadow: 'inset 0 0 100px rgba(6, 182, 212, 0.2)'
                }}
              />
            ) : (
              <FallbackVisualization />
            )}
            
            <div className="absolute inset-4 md:inset-6 rounded-xl pointer-events-none bg-gradient-to-t from-cyan-500/10 via-transparent to-blue-500/10"></div>
          </div>
          
          {/* Enhanced visitor notification */}
          {recentVisitor && (
            <div className="absolute top-6 right-6 bg-cyan-600/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg animate-scale-in border border-cyan-400/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <p className="text-sm font-semibold">
                  🌟 New visitor from {recentVisitor.city}, {recentVisitor.country}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced instructions */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-400 text-sm">
            {webglSupported 
              ? "🖱️ Hover to pause rotation • 🔍 Scroll to zoom • ✨ Click points for details"
              : "🌍 Real-time visitor tracking active • 📊 Updates every few seconds"
            }
          </p>
        </div>
      </div>
    </section>
  );
};
