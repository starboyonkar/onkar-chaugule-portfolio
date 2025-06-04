
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Computer Setup 3D Model Component
const ComputerModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Create a simple computer setup using basic geometries
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group 
      ref={meshRef} 
      scale={hovered ? 1.05 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Desk */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Monitor */}
      <mesh position={[0, 0.5, -0.7]}>
        <boxGeometry args={[2.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#2C2C2C" />
      </mesh>
      
      {/* Monitor Screen */}
      <mesh position={[0, 0.5, -0.65]}>
        <boxGeometry args={[2, 1.3, 0.01]} />
        <meshStandardMaterial 
          color="#000020" 
          emissive="#0040ff" 
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, -0.3, -0.7]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, -0.85, 0.3]}>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[1.2, -0.8, 0.3]}>
        <boxGeometry args={[0.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Laptop (slightly open) */}
      <group position={[-1.5, -0.8, 0]} rotation={[0, Math.PI / 6, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 0.05, 0.8]} />
          <meshStandardMaterial color="silver" />
        </mesh>
        <mesh position={[0, 0.4, -0.3]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
      
      {/* Ambient particles */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 6,
            Math.random() * 3,
            (Math.random() - 0.5) * 4
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshStandardMaterial 
            color="#4A90E2" 
            emissive="#4A90E2" 
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
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
        size={0.05}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Main Computer Setup 3D Component
export const ComputerSetup3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Simplified version for mobile
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="w-28 h-16 bg-blue-900 rounded border-2 border-blue-400 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded"></div>
            </div>
          </div>
          <div className="w-20 h-2 bg-gray-600 rounded-full mx-auto mt-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 relative overflow-hidden rounded-2xl">
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        
        {/* 3D Models */}
        <ComputerModel />
        <FloatingParticles />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </div>
  );
};
