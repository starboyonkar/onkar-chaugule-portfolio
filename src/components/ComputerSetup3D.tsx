
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState, useEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Html, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Loading component for the 3D model
const ModelLoader = () => {
  return (
    <Html center>
      <div className="flex items-center space-x-2 text-blue-400">
        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading 3D Model...</span>
      </div>
    </Html>
  );
};

// Programmer Desktop 3D Model Component
const ProgrammerDesktop = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Try to load the actual Sketchfab model
  // Replace this path with the actual .glb file path when available
  // const { scene } = useGLTF('/models/programmer-desktop-3d-pc.glb');

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Subtle auto-rotation when not hovered
      if (!hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      }
      
      // Add subtle breathing effect to scale
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
      meshRef.current.scale.setScalar(hovered ? 1.05 : breathingScale);
    }
  });

  // Define desk leg positions with proper typing
  const deskLegPositions: [number, number, number][] = [
    [-2.5, -1.8, -1.2],
    [2.5, -1.8, -1.2],
    [-2.5, -1.8, 1.2],
    [2.5, -1.8, 1.2]
  ];

  // Enhanced realistic computer setup
  return (
    <group 
      ref={meshRef} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setLoaded(!loaded)}
    >
      {/* Main Desk with wood texture effect */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.4, 3.5]} />
        <meshStandardMaterial 
          color="#654321" 
          roughness={0.8} 
          metalness={0.1}
          normalScale={new THREE.Vector2(0.5, 0.5)}
        />
      </mesh>
      
      {/* Desk legs */}
      {deskLegPositions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 1.2]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.3, -1.2]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Main Monitor Frame */}
      <mesh position={[0, 0.8, -1.2]} castShadow>
        <boxGeometry args={[3.5, 2.2, 0.2]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor Screen with enhanced glow */}
      <mesh position={[0, 0.8, -1.1]}>
        <boxGeometry args={[3.3, 2, 0.05]} />
        <meshStandardMaterial 
          color="#000030" 
          emissive={hovered ? "#0080ff" : "#004080"}
          emissiveIntensity={hovered ? 0.6 : 0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Screen content simulation */}
      <mesh position={[0, 0.8, -1.05]}>
        <boxGeometry args={[3.2, 1.8, 0.01]} />
        <meshStandardMaterial 
          color="#001122"
          emissive="#00ff88"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Secondary Monitor */}
      <group position={[2.5, 0.5, -1]} rotation={[0, -0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.5, 0.15]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2, 1.3, 0.02]} />
          <meshStandardMaterial 
            color="#001a40" 
            emissive="#0066cc" 
            emissiveIntensity={hovered ? 0.4 : 0.2}
          />
        </mesh>
      </group>
      
      {/* Mechanical Keyboard with RGB */}
      <mesh position={[0, -1.05, 0.6]} castShadow>
        <boxGeometry args={[2.2, 0.2, 0.9]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive={hovered ? "#ff0088" : "#0044ff"} 
          emissiveIntensity={0.3}
          metalness={0.7} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Individual keys */}
      {Array.from({length: 60}).map((_, i) => {
        const row = Math.floor(i / 12);
        const col = i % 12;
        return (
          <mesh 
            key={i} 
            position={[
              (col - 5.5) * 0.15, 
              -0.93, 
              (row - 2) * 0.15 + 0.6
            ]} 
            castShadow
          >
            <boxGeometry args={[0.12, 0.08, 0.12]} />
            <meshStandardMaterial 
              color="#2a2a2a"
              emissive={hovered ? "#ff3366" : "#0033ff"}
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Gaming Mouse with RGB */}
      <mesh position={[1.8, -1, 0.6]} castShadow>
        <boxGeometry args={[0.4, 0.12, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive="#ff3366" 
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Mouse pad */}
      <mesh position={[1.5, -1.15, 0.5]} receiveShadow>
        <boxGeometry args={[1.2, 0.02, 1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      
      {/* Gaming PC Tower */}
      <group position={[-2.2, -0.2, 0.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 2, 1.6]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Tempered glass side panel */}
        <mesh position={[0.46, 0, 0]}>
          <boxGeometry args={[0.02, 1.8, 1.4]} />
          <meshPhysicalMaterial 
            color="#000000" 
            transparent
            opacity={0.3}
            transmission={0.9}
            roughness={0}
            metalness={0}
          />
        </mesh>
        
        {/* RGB lighting strips */}
        <mesh position={[0.45, 0.7, 0]}>
          <boxGeometry args={[0.01, 0.1, 1.2]} />
          <meshStandardMaterial 
            emissive={hovered ? "#ff00ff" : "#00ffff"} 
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0.45, -0.7, 0]}>
          <boxGeometry args={[0.01, 0.1, 1.2]} />
          <meshStandardMaterial 
            emissive={hovered ? "#ffff00" : "#ff0080"} 
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* CPU cooler fan (visible through glass) */}
        <mesh position={[0.2, 0.3, 0]} rotation={[0, 0, loaded ? Math.PI * 4 : 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05]} />
          <meshStandardMaterial 
            color="#333333"
            emissive="#0080ff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
      
      {/* Laptop */}
      <group position={[-1.8, -1, -0.3]} rotation={[0, Math.PI / 5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.08, 1]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.5, -0.4]} rotation={[-Math.PI / 8, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.9, 0.08]} />
          <meshStandardMaterial color="#0d0d0d" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, -0.35]} rotation={[-Math.PI / 8, 0, 0]}>
          <boxGeometry args={[1.3, 0.8, 0.01]} />
          <meshStandardMaterial 
            color="#001122"
            emissive="#004080"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
      
      {/* Books stack */}
      {[0, 0.1, 0.2].map((height, i) => (
        <mesh key={i} position={[2.2, -1.05 + height, 1]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.2]} />
          <meshStandardMaterial 
            color={['#8B0000', '#006400', '#4B0082'][i]} 
            roughness={0.8} 
          />
        </mesh>
      ))}
      
      {/* Coffee mug with steam effect */}
      <mesh position={[-0.8, -1, 1.2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.25]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
      
      {/* Headphones */}
      <group position={[0.5, -0.8, -1.2]}>
        <mesh>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
        </mesh>
        <mesh position={[-0.15, -0.1, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        <mesh position={[0.15, -0.1, 0]}>
          <sphereGeometry args={[0.08]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      </group>
      
      {/* Enhanced ambient particles */}
      {[...Array(20)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 5,
            (Math.random() - 0.5) * 8
          ]}
        >
          <sphereGeometry args={[0.04]} />
          <meshStandardMaterial 
            color="#4A90E2" 
            emissive="#4A90E2" 
            emissiveIntensity={hovered ? 1 : 0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Enhanced Floating Particles Component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#4A90E2"
        size={0.1}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Main Computer Setup 3D Component
export const ComputerSetup3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading delay for smooth entry
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (isMobile) {
    // Enhanced mobile fallback with better visual representation
    return (
      <motion.div 
        className="w-full h-64 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative group">
          {/* Main setup illustration */}
          <div className="relative">
            {/* Monitor */}
            <div className="w-48 h-28 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-2xl border border-blue-500/30">
              <div className="w-44 h-24 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg border-2 border-blue-400/40 animate-pulse">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-blue-400 text-sm font-mono">CODING...</div>
                </div>
              </div>
            </div>
            
            {/* Monitor stand */}
            <div className="w-8 h-6 bg-gray-700 rounded-b-lg mx-auto shadow-lg"></div>
            <div className="w-16 h-2 bg-gray-600 rounded-full mx-auto mt-1"></div>
            
            {/* PC Tower */}
            <div className="absolute -left-12 top-6 w-8 h-16 bg-gradient-to-b from-gray-800 to-black rounded border border-blue-400/30">
              <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded mx-auto mt-2 animate-pulse"></div>
            </div>
            
            {/* Keyboard */}
            <div className="w-32 h-4 bg-gray-700 rounded mt-2 mx-auto border border-gray-600"></div>
          </div>
          
          {/* RGB glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                top: `${20 + (i % 3) * 30}%`,
                left: `${10 + i * 12}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full h-96 relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0.3, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 4, 10], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <Suspense fallback={<ModelLoader />}>
          {/* Professional Lighting Setup */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[10, 15, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
          />
          
          {/* Accent lighting */}
          <pointLight position={[-15, 5, -10]} intensity={0.8} color="#4A90E2" />
          <pointLight position={[15, 8, 10]} intensity={0.6} color="#ff3366" />
          <pointLight position={[0, 10, 5]} intensity={0.4} color="#00ff88" />
          
          {/* Rim lighting */}
          <spotLight
            position={[5, 15, 5]}
            angle={0.4}
            penumbra={1}
            intensity={1.2}
            color="#ffffff"
            castShadow
          />
          
          {/* 3D Models */}
          <ProgrammerDesktop />
          <FloatingParticles />
          
          {/* Enhanced ground contact shadows */}
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.6} 
            scale={20} 
            blur={2} 
          />
          
          {/* Professional Environment */}
          <Environment preset="studio" />
          
          {/* Advanced Camera Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
            maxDistance={20}
            minDistance={5}
            dampingFactor={0.03}
            enableDamping={true}
            zoomSpeed={0.5}
            panSpeed={0.5}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
              <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse"></div>
            </div>
            <div className="space-y-2">
              <p className="text-blue-400 font-mono text-lg">Loading 3D Workspace...</p>
              <p className="text-gray-400 text-sm">Initializing realistic programmer setup</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Interactive Instructions */}
      <motion.div 
        className="absolute bottom-4 left-4 text-xs text-gray-300 space-y-1 bg-black/30 backdrop-blur-sm rounded-lg p-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-400">🖱️</span>
          <span>Drag to rotate view</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400">🔍</span>
          <span>Scroll to zoom in/out</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">🎯</span>
          <span>Hover for RGB effects</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">⚡</span>
          <span>Click PC to activate fan</span>
        </div>
      </motion.div>
      
      {/* Enhanced gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none" />
    </motion.div>
  );
};
