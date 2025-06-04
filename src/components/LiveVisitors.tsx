
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
  population?: number;
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

  // Initialize enhanced globe with World Cities styling
  useEffect(() => {
    if (!globeRef.current) return;

    // Create globe instance with enhanced World Cities styling
    const globe = new Globe(globeRef.current)
      .width(globeRef.current.offsetWidth)
      .height(450)
      .backgroundColor('rgba(0,0,0,0)')
      .enablePointerInteraction(true);

    // Enhanced globe material and textures (World Cities style)
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
    globeMaterial.transparent = true;

    // Add atmospheric glow using custom shader
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        'c': { type: 'f', value: 0.3 },
        'p': { type: 'f', value: 4.5 },
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

    // Create glow effect
    const glowGeometry = new THREE.SphereGeometry(100 * 1.1, 64, 64);
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    globe.scene().add(glowMesh);

    // Enhanced auto-rotate with performance optimization
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

    // Performance optimizations
    globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globe.renderer().shadowMap.enabled = false; // Disable shadows for better performance
    
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

    // Touch handlers for mobile with performance optimization
    const handleTouchStart = () => {
      if (controls) controls.autoRotate = false;
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        if (controls && !isHovered) controls.autoRotate = true;
      }, 1000);
    };

    globeElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    globeElement.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      globeElement.removeEventListener('mouseenter', handleMouseEnter);
      globeElement.removeEventListener('mouseleave', handleMouseLeave);
      globeElement.removeEventListener('touchstart', handleTouchStart);
      globeElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isHovered]);

  // Setup real-time visitor tracking with World Cities data
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
            timestamp: Date.now(),
            population: Math.floor(Math.random() * 1000000) + 50000
          };

          setVisitors(prev => [...prev, currentUser]);
          updateGlobePoints([currentUser]);
          
          setTimeout(() => {
            const demoVisitors = generateWorldCitiesData();
            setVisitors(prev => [...prev, ...demoVisitors]);
            updateGlobePoints(demoVisitors);
            updateStats(demoVisitors.length + 1);
          }, 2000);
        }
      } catch (error) {
        console.log('Using demo data for visitor tracking');
        const demoData = generateWorldCitiesData();
        setVisitors(demoData);
        updateGlobePoints(demoData);
        updateStats(demoData.length);
      }
    };

    trackCurrentUser();
  }, []);

  // Generate World Cities demo data
  const generateWorldCitiesData = (): VisitorData[] => {
    const worldCities = [
      { country: 'India', city: 'Mumbai', lat: 19.0760, lng: 72.8777, population: 20411000 },
      { country: 'USA', city: 'New York', lat: 40.7128, lng: -74.0060, population: 8336000 },
      { country: 'UK', city: 'London', lat: 51.5074, lng: -0.1278, population: 9648000 },
      { country: 'Germany', city: 'Berlin', lat: 52.5200, lng: 13.4050, population: 3669000 },
      { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503, population: 13960000 },
      { country: 'Australia', city: 'Sydney', lat: -33.8688, lng: 151.2093, population: 5312000 },
      { country: 'Canada', city: 'Toronto', lat: 43.6532, lng: -79.3832, population: 2930000 },
      { country: 'Brazil', city: 'São Paulo', lat: -23.5505, lng: -46.6333, population: 12326000 },
      { country: 'France', city: 'Paris', lat: 48.8566, lng: 2.3522, population: 11017000 },
      { country: 'South Korea', city: 'Seoul', lat: 37.5665, lng: 126.9780, population: 9775000 },
      { country: 'China', city: 'Shanghai', lat: 31.2304, lng: 121.4737, population: 24870000 },
      { country: 'Russia', city: 'Moscow', lat: 55.7558, lng: 37.6176, population: 12506000 },
      { country: 'Mexico', city: 'Mexico City', lat: 19.4326, lng: -99.1332, population: 21782000 },
      { country: 'Turkey', city: 'Istanbul', lat: 41.0082, lng: 28.9784, population: 15519000 },
      { country: 'UAE', city: 'Dubai', lat: 25.2048, lng: 55.2708, population: 3331000 }
    ];

    return worldCities.map((city, index) => ({
      id: `world-city-${index}`,
      ...city,
      timestamp: Date.now() - Math.random() * 3600000
    }));
  };

  // Update globe with World Cities styling and animations
  const updateGlobePoints = (newVisitors: VisitorData[]) => {
    if (!globeInstance.current) return;

    // World Cities style points with population-based sizing
    const points = newVisitors.map(visitor => ({
      lat: visitor.lat,
      lng: visitor.lng,
      size: Math.sqrt((visitor.population || 100000) / 100000) * 0.5 + 0.2,
      color: '#00BFFF',
      city: visitor.city,
      country: visitor.country,
      population: visitor.population || 'Unknown'
    }));

    globeInstance.current
      .pointsData(points)
      .pointAltitude(d => Math.max(0.1, Math.sqrt(d.population / 1000000) * 0.3))
      .pointColor('color')
      .pointRadius('size')
      .pointResolution(16) // Reduced for better performance
      .pointLabel(d => `
        <div style="
          background: rgba(0, 0, 0, 0.9); 
          color: #00BFFF; 
          padding: 12px 16px; 
          border-radius: 12px; 
          border: 2px solid #00BFFF;
          font-family: 'Orbitron', monospace;
          box-shadow: 0 0 25px rgba(0, 191, 255, 0.6);
          backdrop-filter: blur(10px);
          max-width: 250px;
        ">
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 6px;">
            🌆 ${d.city}, ${d.country}
          </div>
          <div style="font-size: 12px; color: #87CEEB;">
            👥 Population: ${Number(d.population).toLocaleString()}
          </div>
          <div style="font-size: 10px; color: #B0E0E6; margin-top: 4px;">
            📍 ${d.lat.toFixed(2)}°, ${d.lng.toFixed(2)}°
          </div>
        </div>
      `);

    // Enhanced rings with performance optimization
    globeInstance.current
      .ringsData(newVisitors.slice(-5).map(visitor => ({ // Only show last 5 rings for performance
        lat: visitor.lat,
        lng: visitor.lng
      })))
      .ringColor(() => '#00BFFF')
      .ringMaxRadius(5)
      .ringPropagationSpeed(2)
      .ringRepeatPeriod(1500)
      .ringAltitude(0.05);

    // Show recent visitor notification
    if (newVisitors.length > 0) {
      const latest = newVisitors[newVisitors.length - 1];
      setRecentVisitor(latest);
      setTimeout(() => setRecentVisitor(null), 4000);
    }
  };

  // Update statistics with debouncing
  const updateStats = (visitorCount: number) => {
    const uniqueCountries = new Set(visitors.map(v => v.country)).size;
    setStats({
      totalToday: visitorCount,
      liveNow: Math.floor(visitorCount * 0.3),
      countries: uniqueCountries
    });
  };

  // Handle window resize with throttling
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (globeInstance.current && globeRef.current) {
          globeInstance.current
            .width(globeRef.current.offsetWidth)
            .height(Math.min(450, window.innerHeight * 0.6));
        }
      }, 100); // Throttle resize events
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
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
            Explore global connections with our interactive World Cities globe! 🌍
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
            {/* Globe with World Cities styling and performance optimization */}
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
            
            {/* Enhanced glow overlay */}
            <div className="absolute inset-6 rounded-xl pointer-events-none bg-gradient-to-t from-cyan-500/5 via-transparent to-blue-500/5"></div>
            
            {/* Performance indicator */}
            <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-md text-cyan-400 px-3 py-1 rounded-lg text-sm border border-cyan-500/30">
              {isHovered ? '⏸️ Paused' : '🌍 Auto-rotating'}
            </div>

            {/* World Cities indicator */}
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-md text-purple-400 px-3 py-1 rounded-lg text-sm border border-purple-500/30">
              🏙️ World Cities Mode
            </div>
          </div>
          
          {/* Enhanced Recent Visitor Notification */}
          {recentVisitor && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600/90 to-blue-600/90 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in border border-cyan-400/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold">
                  👋 New visitor from {recentVisitor.city}, {recentVisitor.country}
                  {recentVisitor.population && (
                    <span className="block text-xs text-cyan-200">
                      Population: {recentVisitor.population.toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Instructions */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-400 text-sm mb-2">
            🖱️ Click and drag to rotate • 🔍 Scroll to zoom • ✨ Watch for live city pings
          </p>
          <p className="text-cyan-400 text-xs">
            Hover over cities for population data • Globe size reflects city population
          </p>
        </div>
      </div>
    </section>
  );
};
