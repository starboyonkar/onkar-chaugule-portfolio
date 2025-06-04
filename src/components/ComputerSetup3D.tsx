
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState, useEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Html } from '@react-three/drei';
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
  const [clicked, setClicked] = useState(false);

  // For now, we'll create a detailed computer setup using geometries
  // In production, you would load the actual .glb model from Sketchfab
  // const { scene } = useGLTF('/path-to-your-downloaded-model.glb');

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle auto-rotation when not hovered
      if (!hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      }
    }
  });

  return (
    <group 
      ref={meshRef} 
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Main Desk */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.3, 3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.4, -1]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.8]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Main Monitor */}
      <mesh position={[0, 0.6, -1]} castShadow>
        <boxGeometry args={[3, 2, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Monitor Screen with glow effect */}
      <mesh position={[0, 0.6, -0.93]}>
        <boxGeometry args={[2.8, 1.8, 0.02]} />
        <meshStandardMaterial 
          color="#000040" 
          emissive="#0066ff" 
          emissiveIntensity={hovered ? 0.4 : 0.2}
        />
      </mesh>
      
      {/* Secondary Monitor */}
      <group position={[2.2, 0.3, -0.8]} rotation={[0, -0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2, 1.3, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[1.8, 1.1, 0.01]} />
          <meshStandardMaterial 
            color="#001a40" 
            emissive="#0044cc" 
            emissiveIntensity={hovered ? 0.3 : 0.15}
          />
        </mesh>
      </group>
      
      {/* Gaming Keyboard with RGB effect */}
      <mesh position={[0, -1.05, 0.5]} castShadow>
        <boxGeometry args={[2, 0.15, 0.8]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          emissive={hovered ? "#ff0066" : "#0033ff"} 
          emissiveIntensity={0.2}
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Gaming Mouse */}
      <mesh position={[1.5, -1, 0.5]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.5]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          emissive="#ff3366" 
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.7} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Computer Tower */}
      <group position={[-2, -0.3, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 1.8, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* PC RGB Lighting */}
        <mesh position={[0.41, 0, 0]}>
          <boxGeometry args={[0.02, 1.6, 1.3]} />
          <meshStandardMaterial 
            color="#000000" 
            emissive={hovered ? "#ff00ff" : "#00ffff"} 
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      
      {/* Laptop */}
      <group position={[-1.8, -1, -0.5]} rotation={[0, Math.PI / 4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.08, 0.9]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.5, -0.35]} rotation={[-Math.PI / 8, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Books and Accessories */}
      <mesh position={[2, -1.05, 0.8]} castShadow>
        <boxGeometry args={[0.8, 0.3, 0.15]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>
      
      {/* Coffee Mug */}
      <mesh position={[-0.8, -1, 0.8]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.2]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>
      
      {/* Ambient particles for tech atmosphere */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * 4,
            (Math.random() - 0.5) * 6
          ]}
        >
          <sphereGeometry args={[0.03]} />
          <meshStandardMaterial 
            color="#4A90E2" 
            emissive="#4A90E2" 
            emissiveIntensity={hovered ? 0.8 : 0.4}
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
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const particleCount = 150;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
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
        size={0.08}
        transparent
        opacity={0.7}
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
    
    // Simulate loading delay for effect
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (isMobile) {
    // Enhanced mobile fallback
    return (
      <motion.div 
        className="w-full h-64 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative group">
          <div className="w-40 h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-2xl border border-blue-500/30">
            <div className="w-36 h-20 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg border-2 border-blue-400/50 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="text-blue-400 text-xs font-mono">DEV SETUP</div>
              </div>
            </div>
          </div>
          <div className="w-24 h-3 bg-gray-700 rounded-full mx-auto mt-3 shadow-lg"></div>
          {/* RGB Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full h-96 relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0.3, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<ModelLoader />}>
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 0, -10]} intensity={0.8} color="#4A90E2" />
          <pointLight position={[10, 5, 10]} intensity={0.6} color="#ff3366" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color="#ffffff"
            castShadow
          />
          
          {/* 3D Models */}
          <ProgrammerDesktop />
          <FloatingParticles />
          
          {/* Environment */}
          <Environment preset="studio" />
          
          {/* Enhanced Controls with smooth interactions */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            maxDistance={15}
            minDistance={4}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
      
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-blue-400 font-mono text-sm">Initializing 3D Environment...</p>
          </div>
        </div>
      )}
      
      {/* Interactive Instructions */}
      <motion.div 
        className="absolute bottom-4 left-4 text-xs text-gray-400 space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 2 }}
      >
        <div>🖱️ Drag to rotate</div>
        <div>🔍 Scroll to zoom</div>
        <div>🎯 Click objects to interact</div>
      </motion.div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
