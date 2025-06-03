
import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { Eye, Users, Globe as GlobeIcon } from 'lucide-react';

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

  // Initialize globe
  useEffect(() => {
    if (!globeRef.current) return;

    // Create globe instance with enhanced styling
    const globe = new Globe(globeRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .width(globeRef.current.offsetWidth)
      .height(400)
      .enablePointerInteraction(true);

    // Enhanced atmosphere and material properties
    globe
      .atmosphereColor('#4A90E2')
      .atmosphereAltitude(0.15)
      .showGlobe(true)
      .showAtmosphere(true);

    // Store globe instance
    globeInstance.current = globe;

    // Enhanced auto-rotate with smoother controls
    if (globe.controls) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.3;
      globe.controls().enableZoom = true;
      globe.controls().enablePan = false;
      globe.controls().minDistance = 200;
      globe.controls().maxDistance = 800;
    }

    return () => {
      // Cleanup handled by Globe.gl automatically
    };
  }, []);

  // Setup real-time visitor tracking
  useEffect(() => {
    // Get user's location and emit to server
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

          // Add current user to visitors
          setVisitors(prev => [...prev, currentUser]);
          updateGlobePoints([currentUser]);
          
          // Simulate new visitor for demo (since we don't have a real backend)
          setTimeout(() => {
            const demoVisitors = generateDemoVisitors();
            setVisitors(prev => [...prev, ...demoVisitors]);
            updateGlobePoints(demoVisitors);
            updateStats(demoVisitors.length + 1);
          }, 2000);
        }
      } catch (error) {
        console.log('Using demo data due to API limitation');
        // Use demo data if API fails
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
      { country: 'Brazil', city: 'São Paulo', lat: -23.5505, lng: -46.6333 }
    ];

    return demoLocations.map((location, index) => ({
      id: `demo-${index}`,
      ...location,
      timestamp: Date.now() - Math.random() * 3600000 // Random time within last hour
    }));
  };

  // Update globe with visitor points
  const updateGlobePoints = (newVisitors: VisitorData[]) => {
    if (!globeInstance.current) return;

    const points = newVisitors.map(visitor => ({
      lat: visitor.lat,
      lng: visitor.lng,
      size: Math.random() * 0.5 + 0.3,
      color: '#4A90E2'
    }));

    globeInstance.current
      .pointsData(points)
      .pointAltitude(0.1)
      .pointColor('color')
      .pointRadius('size')
      .pointResolution(32);

    // Add rings for animation effect
    globeInstance.current
      .ringsData(newVisitors.map(visitor => ({
        lat: visitor.lat,
        lng: visitor.lng
      })))
      .ringColor(() => '#4A90E2')
      .ringMaxRadius(2)
      .ringPropagationSpeed(2)
      .ringRepeatPeriod(1000);

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
      liveNow: Math.floor(visitorCount * 0.3), // Simulate live users
      countries: uniqueCountries
    });
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (globeInstance.current && globeRef.current) {
        globeInstance.current.width(globeRef.current.offsetWidth);
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
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delay"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent glassmorphic-bg p-4 rounded-xl backdrop-blur-md">
            Live Visitors Around the World
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            You're not alone—others are exploring too! 🌍
          </p>
          
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-blue-500/20 glassmorphic-bg hover:border-blue-400/40 transition-all duration-300">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Eye className="text-blue-400" size={24} />
                <span className="text-2xl font-bold text-white font-futuristic">{stats.totalToday}</span>
              </div>
              <p className="text-gray-400">Visitors Today</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-green-500/20 glassmorphic-bg hover:border-green-400/40 transition-all duration-300">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="text-green-400" size={24} />
                <span className="text-2xl font-bold text-white font-futuristic">{stats.liveNow}</span>
              </div>
              <p className="text-gray-400">Live Now</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-purple-500/20 glassmorphic-bg hover:border-purple-400/40 transition-all duration-300">
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
          <div className="bg-slate-900/30 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 overflow-hidden shadow-2xl">
            {/* Globe with enhanced container styling */}
            <div 
              ref={globeRef} 
              className="w-full h-[400px] rounded-xl overflow-hidden relative"
              style={{ 
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
                boxShadow: 'inset 0 0 50px rgba(59, 130, 246, 0.2)'
              }}
            />
            
            {/* Glow overlay */}
            <div className="absolute inset-6 rounded-xl pointer-events-none bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10"></div>
          </div>
          
          {/* Recent Visitor Notification */}
          {recentVisitor && (
            <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in border border-blue-400/30">
              <p className="text-sm font-semibold">
                👋 New visitor from {recentVisitor.city}, {recentVisitor.country}
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-400 text-sm">
            🖱️ Click and drag to rotate • 🔍 Scroll to zoom • ✨ Watch for new visitor pings
          </p>
        </div>
      </div>
    </section>
  );
};
