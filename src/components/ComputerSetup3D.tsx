
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useRef, useState, useEffect, Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF, Html, ContactShadows, Text } from '@react-three/drei';
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

// Computer Monitor Component
const Monitor = ({ position, rotation = [0, 0, 0] as [number, number, number], scale = 1 }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number]; 
  scale?: number 
}) => {
  const monitorRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (monitorRef.current) {
      const time = state.clock.elapsedTime;
      monitorRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.02;
    }
  });

  return (
    <group 
      ref={monitorRef} 
      position={position} 
      rotation={rotation} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Monitor Stand */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Monitor Base */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.4, 1.4, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.2, 0.041]}>
        <boxGeometry args={[2.2, 1.2, 0.01]} />
        <meshStandardMaterial 
          color="#000033"
          emissive={hovered ? "#0066ff" : "#003366"}
          emissiveIntensity={hovered ? 0.8 : 0.4}
        />
      </mesh>

      {/* Screen Content */}
      <mesh position={[0, 0.2, 0.045]}>
        <boxGeometry args={[2.1, 1.1, 0.001]} />
        <meshStandardMaterial 
          color="#001122"
          emissive="#00ff88"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Code Lines Simulation */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-0.8 + (i % 2) * 0.4, 0.5 - i * 0.12, 0.046]}>
          <boxGeometry args={[0.6, 0.02, 0.001]} />
          <meshStandardMaterial 
            emissive="#00ff88"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// PC Tower Component
const PCTower = ({ position, rotation = [0, 0, 0] as [number, number, number] }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number] 
}) => {
  const towerRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Mesh>(null);
  const [isOn, setIsOn] = useState(false);

  useFrame((state) => {
    if (fanRef.current && isOn) {
      fanRef.current.rotation.z += 0.3;
    }
    if (towerRef.current) {
      const time = state.clock.elapsedTime;
      towerRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.01;
    }
  });

  return (
    <group 
      ref={towerRef} 
      position={position} 
      rotation={rotation}
      onClick={() => setIsOn(!isOn)}
    >
      {/* Main Tower Body */}
      <mesh>
        <boxGeometry args={[0.8, 1.8, 1.4]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Tempered Glass Panel */}
      <mesh position={[0.41, 0, 0]}>
        <boxGeometry args={[0.02, 1.6, 1.2]} />
        <meshPhysicalMaterial 
          color="#000000"
          transparent
          opacity={0.2}
          transmission={0.9}
          roughness={0}
          metalness={0}
        />
      </mesh>

      {/* RGB Strips */}
      <mesh position={[0.4, 0.6, 0]}>
        <boxGeometry args={[0.01, 0.05, 1]} />
        <meshStandardMaterial 
          emissive={isOn ? "#ff00ff" : "#0066ff"}
          emissiveIntensity={isOn ? 1.2 : 0.6}
        />
      </mesh>
      <mesh position={[0.4, -0.6, 0]}>
        <boxGeometry args={[0.01, 0.05, 1]} />
        <meshStandardMaterial 
          emissive={isOn ? "#00ffff" : "#ff3366"}
          emissiveIntensity={isOn ? 1.2 : 0.6}
        />
      </mesh>

      {/* CPU Fan */}
      <mesh ref={fanRef} position={[0.35, 0.2, 0]} rotation={[0, 0, 0] as [number, number, number]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03]} />
        <meshStandardMaterial 
          color="#333333"
          emissive={isOn ? "#0080ff" : "#004080"}
          emissiveIntensity={isOn ? 0.5 : 0.2}
        />
      </mesh>

      {/* Power Button */}
      <mesh position={[0, 0.8, 0.71]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02]} />
        <meshStandardMaterial 
          emissive={isOn ? "#00ff00" : "#ff0000"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

// Simplified Keyboard for mobile performance
const MechanicalKeyboard = ({ position, rotation = [0, 0, 0] as [number, number, number] }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number] 
}) => {
  const keyboardRef = useRef<THREE.Group>(null);
  const [typingAnimation, setTypingAnimation] = useState(false);

  useFrame((state) => {
    if (keyboardRef.current) {
      const time = state.clock.elapsedTime;
      if (typingAnimation) {
        keyboardRef.current.position.y = position[1] + Math.sin(time * 10) * 0.005;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingAnimation(true);
      setTimeout(() => setTypingAnimation(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={keyboardRef} position={position} rotation={rotation}>
      {/* Keyboard Base */}
      <mesh>
        <boxGeometry args={[1.8, 0.15, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          emissive="#0044ff"
          emissiveIntensity={typingAnimation ? 0.4 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Simplified key grid for better performance */}
      {Array.from({length: 24}).map((_, i) => {
        const row = Math.floor(i / 6);
        const col = i % 6;
        const isPressed = typingAnimation && Math.random() > 0.7;
        
        return (
          <mesh 
            key={i} 
            position={[
              (col - 2.5) * 0.24, 
              0.075 + (isPressed ? -0.02 : 0), 
              (row - 1.5) * 0.12
            ]}
          >
            <boxGeometry args={[0.16, 0.06, 0.08]} />
            <meshStandardMaterial 
              color="#2a2a2a"
              emissive={isPressed ? "#ff3366" : "#0033ff"}
              emissiveIntensity={isPressed ? 0.8 : 0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Gaming Mouse Component
const GamingMouse = ({ position, rotation = [0, 0, 0] as [number, number, number] }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number] 
}) => {
  const mouseRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (mouseRef.current && clicked) {
      mouseRef.current.position.y = position[1] - 0.02;
    } else if (mouseRef.current) {
      mouseRef.current.position.y = position[1];
    }
  });

  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => setClicked(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [clicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClicked(true);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={mouseRef} onClick={() => setClicked(true)}>
        <boxGeometry args={[0.3, 0.08, 0.5]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          emissive="#ff3366"
          emissiveIntensity={clicked ? 1 : 0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* RGB Light Strip */}
      <mesh position={[0, 0.041, 0]}>
        <boxGeometry args={[0.25, 0.001, 0.4]} />
        <meshStandardMaterial 
          emissive={clicked ? "#00ffff" : "#ff0080"}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

// Desk Component
const Desk = ({ position = [0, 0, 0] as [number, number, number] }: { position?: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Desktop Surface */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial 
          color="#654321"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Desk Legs - simplified for mobile */}
      {[
        [-1.8, -0.4, -1] as [number, number, number],
        [1.8, -0.4, -1] as [number, number, number],
        [-1.8, -0.4, 1] as [number, number, number],
        [1.8, -0.4, 1] as [number, number, number]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.8]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.5} roughness={0.7} />
        </mesh>
      ))}

      {/* Mouse Pad */}
      <mesh position={[1.2, 0.051, 0.3]} receiveShadow>
        <boxGeometry args={[0.8, 0.001, 0.6]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
    </group>
  );
};

// Main Computer Setup Component
const ComputerSetup = ({ isMobile }: { isMobile: boolean }) => {
  const setupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (setupRef.current && !isMobile) {
      const time = state.clock.elapsedTime;
      setupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
      setupRef.current.position.y = Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <group ref={setupRef}>
      <Desk position={[0, -0.8, 0]} />
      <Monitor position={[0, 0.5, -0.8]} />
      {!isMobile && <Monitor position={[1.8, 0.2, -0.6]} rotation={[0, -0.3, 0]} scale={0.7} />}
      <PCTower position={[-1.5, 0, 0.5]} />
      <MechanicalKeyboard position={[0, -0.7, 0.4]} />
      <GamingMouse position={[1.2, -0.7, 0.3]} />
      
      {/* Coffee Mug */}
      <mesh position={[-0.6, -0.7, 0.8]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.15]} />
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </mesh>

      {!isMobile && (
        <>
          {/* Books Stack */}
          {[0, 0.05, 0.1].map((height, i) => (
            <mesh key={i} position={[1.6, -0.75 + height, 0.8]} castShadow>
              <boxGeometry args={[0.6, 0.05, 0.15]} />
              <meshStandardMaterial 
                color={['#8B0000', '#006400', '#4B0082'][i]} 
                roughness={0.8} 
              />
            </mesh>
          ))}

          {/* Ambient Particles - reduced for mobile */}
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
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
};

// Floating Code Particles - simplified for mobile
const FloatingCode = ({ isMobile }: { isMobile: boolean }) => {
  const codeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (codeRef.current && !isMobile) {
      codeRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const texts = isMobile ? ['React', 'TypeScript'] : ['React', 'Three.js', 'TypeScript', 'Vite', 'WebGL'];

  return (
    <group ref={codeRef}>
      {texts.map((text, i) => (
        <Text
          key={i}
          position={[
            Math.sin(i * 1.2) * (isMobile ? 3 : 6),
            Math.cos(i * 0.8) * (isMobile ? 2 : 3) + 2,
            Math.sin(i * 0.5) * (isMobile ? 2 : 4)
          ]}
          fontSize={isMobile ? 0.2 : 0.3}
          color="#4A90E2"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      ))}
    </group>
  );
};

// Mobile fallback component
const MobileFallback = () => (
  <motion.div 
    className="w-full h-96 flex items-center justify-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="relative group">
      <div className="relative">
        {/* Monitor */}
        <div className="w-64 h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-2xl border border-blue-500/30">
          <div className="w-60 h-32 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg border-2 border-blue-400/40 animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="text-blue-400 text-lg font-mono">CODING...</div>
            </div>
          </div>
        </div>
        
        <div className="w-12 h-8 bg-gray-700 rounded-b-lg mx-auto shadow-lg"></div>
        <div className="w-20 h-3 bg-gray-600 rounded-full mx-auto mt-2"></div>
        
        <div className="absolute -left-16 top-8 w-12 h-20 bg-gradient-to-b from-gray-800 to-black rounded border border-blue-400/30">
          <div className="w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded mx-auto mt-2 animate-pulse"></div>
        </div>
        
        <div className="w-40 h-6 bg-gray-700 rounded mt-4 mx-auto border border-gray-600"></div>
      </div>
      
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  </motion.div>
);

// Main Component
export const ComputerSetup3D = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Show fallback for very small screens or low-end devices
      const isLowEnd = mobile && (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.devicePixelRatio < 2
      );
      setShowFallback(isLowEnd && window.innerWidth < 480);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, []);

  if (showFallback) {
    return <MobileFallback />;
  }

  return (
    <motion.div 
      className="w-full h-96 relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isLoaded ? 1 : 0.3, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Canvas
        shadows={!isMobile}
        camera={{ 
          position: isMobile ? [3, 2, 5] : [5, 3, 8], 
          fov: isMobile ? 60 : 50 
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: !isMobile, 
          powerPreference: isMobile ? "low-power" : "high-performance",
          alpha: true,
          pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<ModelLoader />}>
          {/* Optimized Lighting */}
          <ambientLight intensity={isMobile ? 0.6 : 0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={isMobile ? 0.8 : 1}
            castShadow={!isMobile}
            shadow-mapSize-width={isMobile ? 512 : 2048}
            shadow-mapSize-height={isMobile ? 512 : 2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {!isMobile && (
            <>
              <pointLight position={[-5, 5, -5]} intensity={0.4} color="#4A90E2" />
              <pointLight position={[5, 5, 5]} intensity={0.3} color="#ff3366" />
            </>
          )}
          
          <ComputerSetup isMobile={isMobile} />
          <FloatingCode isMobile={isMobile} />
          
          {!isMobile && (
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.4} 
              scale={15} 
              blur={2.5} 
            />
          )}
          
          <Environment preset="studio" />
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={!isMobile}
            autoRotateSpeed={isMobile ? 0.3 : 0.8}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            maxDistance={isMobile ? 10 : 15}
            minDistance={isMobile ? 2 : 3}
            dampingFactor={0.05}
            enableDamping={true}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
          />
        </Suspense>
      </Canvas>
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
              <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="space-y-2">
              <p className="text-blue-400 font-mono text-lg">Loading 3D Workspace...</p>
              <p className="text-gray-400 text-sm">Building realistic programmer setup</p>
            </div>
          </div>
        </div>
      )}
      
      <motion.div 
        className="absolute bottom-4 left-4 text-xs text-gray-300 space-y-1 bg-black/30 backdrop-blur-sm rounded-lg p-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-400">🖱️</span>
          <span>{isMobile ? 'Touch to rotate' : 'Drag to rotate view'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400">🔍</span>
          <span>{isMobile ? 'Pinch to zoom' : 'Scroll to zoom'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">💻</span>
          <span>Click PC to power on</span>
        </div>
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
