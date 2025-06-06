
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect, Suspense } from 'react';
import { OrbitControls, Environment, Html, ContactShadows, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Loading component for the 3D model
const ModelLoader = () => {
  return (
    <Html center>
      <div className="flex items-center space-x-2 text-blue-400">
        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm">Loading 3D Model...</span>
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
      monitorRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.01;
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
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Monitor Base */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0.2, 0]} castShadow>
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
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-0.8 + (i % 2) * 0.4, 0.5 - i * 0.15, 0.046]}>
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
const PCTower = ({ position, rotation = [0, 0, 0] as [number, number, number], isMobile }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  isMobile: boolean;
}) => {
  const towerRef = useRef<THREE.Group>(null);
  const fanRef = useRef<THREE.Mesh>(null);
  const [isOn, setIsOn] = useState(false);

  useFrame((state) => {
    if (fanRef.current && isOn) {
      fanRef.current.rotation.z += 0.2;
    }
    if (towerRef.current && !isMobile) {
      const time = state.clock.elapsedTime;
      towerRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.008;
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
      <mesh castShadow>
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

// Optimized Keyboard for mobile performance
const MechanicalKeyboard = ({ position, rotation = [0, 0, 0] as [number, number, number], isMobile }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  isMobile: boolean;
}) => {
  const keyboardRef = useRef<THREE.Group>(null);
  const [typingAnimation, setTypingAnimation] = useState(false);

  useFrame((state) => {
    if (keyboardRef.current && !isMobile) {
      const time = state.clock.elapsedTime;
      if (typingAnimation) {
        keyboardRef.current.position.y = position[1] + Math.sin(time * 8) * 0.003;
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingAnimation(true);
      setTimeout(() => setTypingAnimation(false), 400);
    }, isMobile ? 5000 : 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const keyCount = isMobile ? 16 : 24;
  const keysPerRow = isMobile ? 4 : 6;

  return (
    <group ref={keyboardRef} position={position} rotation={rotation}>
      {/* Keyboard Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.15, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          emissive="#0044ff"
          emissiveIntensity={typingAnimation ? 0.4 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Optimized key grid */}
      {Array.from({length: keyCount}).map((_, i) => {
        const row = Math.floor(i / keysPerRow);
        const col = i % keysPerRow;
        const isPressed = typingAnimation && Math.random() > 0.8;
        
        return (
          <mesh 
            key={i} 
            position={[
              (col - (keysPerRow - 1) / 2) * 0.24, 
              0.075 + (isPressed ? -0.015 : 0), 
              (row - 1.5) * 0.12
            ]}
            castShadow
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
      mouseRef.current.position.y = position[1] - 0.015;
    } else if (mouseRef.current) {
      mouseRef.current.position.y = position[1];
    }
  });

  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => setClicked(false), 80);
      return () => clearTimeout(timeout);
    }
  }, [clicked]);

  useEffect(() => {
    const interval = setInterval(() => {
      setClicked(true);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={mouseRef} onClick={() => setClicked(true)} castShadow>
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
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial 
          color="#654321"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Desk Legs */}
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
      setupRef.current.rotation.y = Math.sin(time * 0.08) * 0.03;
      setupRef.current.position.y = Math.sin(time * 0.2) * 0.015;
    }
  });

  return (
    <group ref={setupRef}>
      <Desk position={[0, -0.8, 0]} />
      <Monitor position={[0, 0.5, -0.8]} />
      {!isMobile && <Monitor position={[1.8, 0.2, -0.6]} rotation={[0, -0.3, 0]} scale={0.7} />}
      <PCTower position={[-1.5, 0, 0.5]} isMobile={isMobile} />
      <MechanicalKeyboard position={[0, -0.7, 0.4]} isMobile={isMobile} />
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

          {/* Ambient Particles */}
          {[...Array(6)].map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 5,
                Math.random() * 2.5 + 0.5,
                (Math.random() - 0.5) * 3.5
              ]}
            >
              <sphereGeometry args={[0.015]} />
              <meshStandardMaterial 
                color="#4A90E2" 
                emissive="#4A90E2" 
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
};

// Floating Code Particles
const FloatingCode = ({ isMobile }: { isMobile: boolean }) => {
  const codeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (codeRef.current && !isMobile) {
      codeRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  const texts = isMobile ? ['React', 'Three.js'] : ['React', 'Three.js', 'TypeScript', 'WebGL'];

  return (
    <group ref={codeRef}>
      {texts.map((text, i) => (
        <Text
          key={i}
          position={[
            Math.sin(i * 1.5) * (isMobile ? 2.5 : 5),
            Math.cos(i * 0.8) * (isMobile ? 1.5 : 2.5) + 1.5,
            Math.sin(i * 0.6) * (isMobile ? 1.5 : 3)
          ]}
          fontSize={isMobile ? 0.15 : 0.25}
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

// Enhanced Mobile Fallback
const MobileFallback = () => (
  <motion.div 
    className="w-full h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
  >
    <div className="relative group p-6">
      <div className="relative">
        {/* Monitor */}
        <div className="w-48 sm:w-64 h-28 sm:h-36 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-2xl border border-blue-500/30">
          <div className="w-44 sm:w-60 h-24 sm:h-32 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg border-2 border-blue-400/40 animate-pulse">
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="text-blue-400 text-sm sm:text-lg font-mono">CODING...</div>
            </div>
          </div>
        </div>
        
        <div className="w-8 sm:w-12 h-6 sm:h-8 bg-gray-700 rounded-b-lg mx-auto shadow-lg"></div>
        <div className="w-16 sm:w-20 h-2 sm:h-3 bg-gray-600 rounded-full mx-auto mt-2"></div>
        
        <div className="absolute -left-12 sm:-left-16 top-6 sm:top-8 w-8 sm:w-12 h-16 sm:h-20 bg-gradient-to-b from-gray-800 to-black rounded border border-blue-400/30">
          <div className="w-1.5 sm:w-2 h-12 sm:h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded mx-auto mt-2 animate-pulse"></div>
        </div>
        
        <div className="w-32 sm:w-40 h-4 sm:h-6 bg-gray-700 rounded mt-4 mx-auto border border-gray-600"></div>
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
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      const isTouchDevice = 'ontouchstart' in window;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      const mobile = width < 768 || isTouchDevice || isMobileUA;
      setIsMobile(mobile);
      
      // Enhanced device capability detection
      const isLowEnd = mobile && (
        width < 480 ||
        navigator.hardwareConcurrency < 4 ||
        (navigator as any).deviceMemory < 4
      );
      
      setShowFallback(isLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      clearTimeout(timer);
    };
  }, []);

  // Error boundary for 3D rendering
  useEffect(() => {
    const handleError = () => setError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (showFallback || error) {
    return <MobileFallback />;
  }

  return (
    <motion.div 
      className="w-full h-80 md:h-96 relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isLoaded ? 1 : 0.5, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Canvas
        shadows={!isMobile}
        camera={{ 
          position: isMobile ? [2.5, 1.8, 4] : [4, 2.5, 6], 
          fov: isMobile ? 65 : 55,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: !isMobile, 
          powerPreference: isMobile ? "low-power" : "high-performance",
          alpha: true
        }}
        performance={{ min: 0.5 }}
        onCreated={({ gl, scene }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
          gl.shadowMap.enabled = !isMobile;
          gl.shadowMap.type = isMobile ? THREE.BasicShadowMap : THREE.PCFSoftShadowMap;
          scene.fog = new THREE.Fog(0x000000, 10, 50);
        }}
      >
        <Suspense fallback={<ModelLoader />}>
          {/* Optimized Lighting */}
          <ambientLight intensity={isMobile ? 0.7 : 0.5} />
          <directionalLight
            position={[8, 8, 5]}
            intensity={isMobile ? 0.9 : 1.2}
            castShadow={!isMobile}
            shadow-mapSize-width={isMobile ? 512 : 1024}
            shadow-mapSize-height={isMobile ? 512 : 1024}
            shadow-camera-far={30}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          
          {!isMobile && (
            <>
              <pointLight position={[-4, 4, -4]} intensity={0.3} color="#4A90E2" />
              <pointLight position={[4, 4, 4]} intensity={0.25} color="#ff3366" />
            </>
          )}
          
          <ComputerSetup isMobile={isMobile} />
          <FloatingCode isMobile={isMobile} />
          
          {!isMobile && (
            <ContactShadows 
              position={[0, -1.4, 0]} 
              opacity={0.3} 
              scale={12} 
              blur={2} 
            />
          )}
          
          <Environment preset="studio" />
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isMobile ? 0.4 : 0.6}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 8}
            maxDistance={isMobile ? 8 : 12}
            minDistance={isMobile ? 2.5 : 3.5}
            dampingFactor={0.08}
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
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
              <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="space-y-2">
              <p className="text-blue-400 font-mono text-sm md:text-lg">Loading 3D Workspace...</p>
              <p className="text-gray-400 text-xs md:text-sm">Building realistic setup</p>
            </div>
          </div>
        </div>
      )}
      
      <motion.div 
        className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-xs text-gray-300 space-y-1 bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-blue-400">🖱️</span>
          <span className="text-xs">{isMobile ? 'Touch to rotate' : 'Drag to rotate view'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400">🔍</span>
          <span className="text-xs">{isMobile ? 'Pinch to zoom' : 'Scroll to zoom'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">💻</span>
          <span className="text-xs">Click PC to power on</span>
        </div>
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};
