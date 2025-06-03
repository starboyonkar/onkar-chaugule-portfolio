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
  color?: string;
}

interface VisitorStats {
  totalToday: number;
  liveNow: number;
  countries: number;
}

interface CityData {
  city: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
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
  const [isLoading, setIsLoading] = useState(true);

  // Major world cities data for visualization
  const worldCities: CityData[] = [
    { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, population: 37400068 },
    { city: 'Delhi', country: 'India', lat: 28.7041, lng: 77.1025, population: 28514000 },
    { city: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, population: 25582000 },
    { city: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, population: 21650000 },
    { city: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, population: 21581000 },
    { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, population: 20076000 },
    { city: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, population: 19980000 },
    { city: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, population: 19618000 },
    { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, population: 19578000 },
    { city: 'Osaka', country: 'Japan', lat: 34.6937, lng: 135.5023, population: 19281000 },
    { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, population: 18819000 },
    { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, population: 15400000 },
    { city: 'Buenos Aires', country: 'Argentina', lat: -34.6118, lng: -58.3960, population: 14967000 },
    { city: 'Chongqing', country: 'China', lat: 29.4316, lng: 106.9123, population: 14838000 },
    { city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, population: 14751000 },
    { city: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, population: 14681000 },
    { city: 'Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842, population: 13482000 },
    { city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, population: 13463000 },
    { city: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729, population: 13293000 },
    { city: 'Tianjin', country: 'China', lat: 39.3434, lng: 117.3616, population: 13215000 },
    { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, population: 9304000 },
    { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, population: 10844000 },
    { city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, population: 3669000 },
    { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, population: 5312000 },
    { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, population: 6196000 },
    { city: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, population: 9963000 },
    { city: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6176, population: 12506000 },
    { city: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, population: 10156000 }
  ];

  // Initialize the globe with World Cities styling
  useEffect(() => {
    if (!globeRef.current || globeInstance.current) return;

    setIsLoading(true);

    // Create globe instance with enhanced performance settings
    const globe = new Globe(globeRef.current)
      .width(globeRef.current.offsetWidth)
      .height(450)
      .backgroundColor('rgba(0,0,0,0)')
      .enablePointerInteraction(true)
      .animateIn(true);

    // Enhanced globe styling with high-resolution textures
    globe
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGlobe(true)
      .showAtmosphere(true)
      .atmosphereColor('#4A90E2')
      .atmosphereAltitude(0.15);

    // Enhanced globe material with better performance
    const globeMaterial = globe.globeMaterial();
    globeMaterial.bumpScale = 10;
    globeMaterial.shininess = 0.1;
    globeMaterial.specularMap = new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png');

    // Add world cities as points with population-based sizing
    const cityPoints = worldCities.map(city => ({
      ...city,
      size: Math.sqrt(city.population) * 0.01,
      color: '#00BFFF'
    }));

    globe
      .pointsData(cityPoints)
      .pointAltitude(0.1)
      .pointColor('color')
      .pointRadius('size')
      .pointResolution(32)
      .pointLabel(d => `
        <div style="
          background: rgba(0, 0, 0, 0.9); 
          color: #00BFFF; 
          padding: 12px 16px; 
          border-radius: 12px; 
          border: 2px solid #00BFFF;
          font-family: 'Orbitron', monospace;
          box-shadow: 0 0 30px rgba(0, 191, 255, 0.8);
          backdrop-filter: blur(10px);
          max-width: 200px;
        ">
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
            🏙️ ${d.city}
          </div>
          <div style="font-size: 12px; opacity: 0.8; margin-bottom: 4px;">
            📍 ${d.country}
          </div>
          <div style="font-size: 11px; opacity: 0.6;">
            👥 ${(d.population / 1000000).toFixed(1)}M people
          </div>
        </div>
      `);

    // Enhanced controls with better performance
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 200;
      controls.maxDistance = 800;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.5;
      controls.zoomSpeed = 0.8;
    }

    // Add atmospheric glow with performance optimization
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        'c': { type: 'f', value: 0.2 },
        'p': { type: 'f', value: 6.0 },
        glowColor: { type: 'c', value: new THREE.Color(0x4A90E2) },
        viewVector: { type: 'v3', value: new THREE.Vector3() }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(c - dot(vNormal, vNormel), p);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const glowGeometry = new THREE.SphereGeometry(100 * 1.05, 32, 32);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    globe.scene().add(glowMesh);

    // Store globe instance
    globeInstance.current = globe;

    // Performance optimization: reduce quality on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      globe.pointResolution(16);
      const renderer = globe.renderer();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }

    setIsLoading(false);

    // Mouse and touch interaction handlers
    const handleMouseEnter = () => {
      setIsHovered(true);
      if (controls) controls.autoRotate = false;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (controls) controls.autoRotate = true;
    };

    const handleTouchStart = () => {
      if (controls) controls.autoRotate = false;
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        if (controls && !isHovered) controls.autoRotate = true;
      }, 2000);
    };

    const globeElement = globeRef.current;
    globeElement.addEventListener('mouseenter', handleMouseEnter);
    globeElement.addEventListener('mouseleave', handleMouseLeave);
    globeElement.addEventListener('touchstart', handleTouchStart);
    globeElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (globeElement) {
        globeElement.removeEventListener('mouseenter', handleMouseEnter);
        globeElement.removeEventListener('mouseleave', handleMouseLeave);
        globeElement.removeEventListener('touchstart', handleTouchStart);
        globeElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isHovered]);

  // Real-time visitor tracking simulation
  useEffect(() => {
    const trackCurrentUser = async () => {
      try {
        // Try to get real user location
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.latitude && data.longitude) {
          const currentUser: VisitorData = {
            id: `user-${Date.now()}`,
            country: data.country_name || 'Unknown',
            city: data.city || 'Unknown',
            lat: data.latitude,
            lng: data.longitude,
            timestamp: Date.now(),
            color: '#00FF88'
          };

          addNewVisitor(currentUser);
        } else {
          throw new Error('No location data');
        }
      } catch (error) {
        console.log('Using demo data for visitor tracking');
        // Fallback to demo data
        setTimeout(() => {
          simulateRealTimeVisitors();
        }, 1000);
      }
    };

    // Simulate real-time visitors every 3-8 seconds
    const simulateRealTimeVisitors = () => {
      const interval = setInterval(() => {
        const randomCity = worldCities[Math.floor(Math.random() * worldCities.length)];
        const newVisitor: VisitorData = {
          id: `visitor-${Date.now()}-${Math.random()}`,
          country: randomCity.country,
          city: randomCity.city,
          lat: randomCity.lat + (Math.random() - 0.5) * 2, // Add slight randomness
          lng: randomCity.lng + (Math.random() - 0.5) * 2,
          timestamp: Date.now(),
          color: '#00BFFF'
        };

        addNewVisitor(newVisitor);
      }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds

      return interval;
    };

    trackCurrentUser();
    const visitorInterval = simulateRealTimeVisitors();

    return () => {
      if (visitorInterval) {
        clearInterval(visitorInterval);
      }
    };
  }, []);

  // Add new visitor with real-time ping animation
  const addNewVisitor = (visitor: VisitorData) => {
    setVisitors(prev => {
      const updated = [...prev, visitor];
      // Keep only last 50 visitors for performance
      return updated.slice(-50);
    });

    // Add real-time ping with enhanced animation
    if (globeInstance.current) {
      // Add pulsing rings for new visitors
      const currentRings = globeInstance.current.ringsData() || [];
      globeInstance.current.ringsData([...currentRings, {
        lat: visitor.lat,
        lng: visitor.lng,
        maxR: 8,
        propagationSpeed: 2,
        repeatPeriod: 1200
      }]);

      // Remove ring after animation
      setTimeout(() => {
        const rings = globeInstance.current.ringsData() || [];
        globeInstance.current.ringsData(rings.slice(1));
      }, 1200);

      // Add visitor point
      const currentPoints = globeInstance.current.pointsData() || [];
      const visitorPoint = {
        lat: visitor.lat,
        lng: visitor.lng,
        size: 1.5,
        color: visitor.color || '#00BFFF',
        city: visitor.city,
        country: visitor.country,
        isVisitor: true
      };

      globeInstance.current.pointsData([...currentPoints, visitorPoint]);
    }

    // Update stats
    setStats(prev => ({
      totalToday: prev.totalToday + 1,
      liveNow: Math.floor((prev.totalToday + 1) * 0.15),
      countries: new Set([...visitors.map(v => v.country), visitor.country]).size
    }));

    // Show notification
    setRecentVisitor(visitor);
    setTimeout(() => setRecentVisitor(null), 4000);
  };

  // Configure rings for smooth animation
  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current
        .ringColor(() => '#00BFFF')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .ringAltitude(0.02);
    }
  }, []);

  // Handle window resize with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (globeInstance.current && globeRef.current) {
          const width = globeRef.current.offsetWidth;
          const height = Math.min(450, window.innerHeight * 0.6);
          globeInstance.current.width(width).height(height);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-slate-900/30 backdrop-blur-sm relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text font-futuristic bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent glassmorphic-bg p-6 rounded-xl backdrop-blur-md">
            🌍 Live Global Visitors
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Real-time visitor tracking from around the world • Interactive 3D Globe
          </p>
          
          {/* Enhanced Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-blue-500/30 glassmorphic-bg hover:border-blue-400/50 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Eye className="text-blue-400 group-hover:text-blue-300 transition-colors" size={28} />
                <span className="text-3xl font-bold text-white font-futuristic">{stats.totalToday}</span>
              </div>
              <p className="text-gray-400">Total Visitors</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-cyan-500/30 glassmorphic-bg hover:border-cyan-400/50 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="text-cyan-400 group-hover:text-cyan-300 transition-colors" size={28} />
                <span className="text-3xl font-bold text-white font-futuristic">{stats.liveNow}</span>
              </div>
              <p className="text-gray-400">Live Now</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-xl border border-purple-500/30 glassmorphic-bg hover:border-purple-400/50 hover:scale-105 transition-all duration-300 group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <GlobeIcon className="text-purple-400 group-hover:text-purple-300 transition-colors" size={28} />
                <span className="text-3xl font-bold text-white font-futuristic">{stats.countries}</span>
              </div>
              <p className="text-gray-400">Countries</p>
            </div>
          </div>
        </div>

        {/* Globe Container */}
        <div className="relative">
          <div className="bg-slate-900/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20 overflow-hidden shadow-2xl">
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-6 rounded-xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-blue-400 font-futuristic">Loading Globe...</p>
                </div>
              </div>
            )}
            
            {/* Globe */}
            <div 
              ref={globeRef} 
              className="w-full h-[450px] rounded-xl overflow-hidden relative cursor-pointer transform-gpu"
              style={{ 
                background: 'radial-gradient(circle at center, rgba(0, 191, 255, 0.08) 0%, rgba(0, 0, 0, 0.95) 100%)',
                boxShadow: `
                  inset 0 0 50px rgba(0, 191, 255, 0.2),
                  0 0 100px rgba(0, 191, 255, 0.15),
                  0 0 200px rgba(74, 144, 226, 0.08)
                `
              }}
            />
            
            {/* Status indicators */}
            <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-md text-cyan-400 px-4 py-2 rounded-lg text-sm border border-cyan-500/40 font-futuristic">
              {isHovered ? '⏸️ Paused' : '🌍 Auto-rotating'}
            </div>

            <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-md text-green-400 px-4 py-2 rounded-lg text-sm border border-green-500/40 font-futuristic">
              📡 Live Tracking
            </div>
          </div>
          
          {/* Recent Visitor Notification */}
          {recentVisitor && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600/95 to-blue-600/95 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-lg animate-fade-in border border-cyan-400/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-bold font-futuristic">
                    👋 New Visitor!
                  </p>
                  <p className="text-xs opacity-90">
                    📍 {recentVisitor.city}, {recentVisitor.country}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-slate-900/30 backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
            <h3 className="text-lg font-bold text-cyan-400 mb-3 font-futuristic">Interactive Controls</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">🖱️</span>
                <span>Click & drag to rotate the globe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">🔍</span>
                <span>Scroll to zoom in/out</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">👆</span>
                <span>Hover over cities for details</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📡</span>
                <span>Watch real-time visitor pings</span>
              </div>
            </div>
            <p className="text-cyan-400 text-xs mt-4 opacity-75">
              Major world cities are shown as blue dots • New visitors appear with animated ripples
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
