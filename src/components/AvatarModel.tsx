
import { useFrame } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useState, useEffect, useRef } from 'react';

interface AvatarModelProps {
  isSpeaking: boolean;
  currentText: string;
}

export const AvatarModel = ({ isSpeaking, currentText }: AvatarModelProps) => {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Mesh>(null);
  const eyesRef = useRef<Group>(null);
  const mouthRef = useRef<Mesh>(null);
  
  const [mouthScale, setMouthScale] = useState(1);
  const [eyeBlinkTimer, setEyeBlinkTimer] = useState(0);

  // Animate the avatar
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle breathing motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Subtle head rotation
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
    }

    // Eye blinking animation
    setEyeBlinkTimer(prev => prev + delta);
    if (eyeBlinkTimer > 3) {
      setEyeBlinkTimer(0);
      if (eyesRef.current) {
        eyesRef.current.scale.y = 0.1;
        setTimeout(() => {
          if (eyesRef.current) eyesRef.current.scale.y = 1;
        }, 150);
      }
    }

    // Mouth animation for speaking
    if (isSpeaking) {
      const speakAnimation = Math.sin(state.clock.elapsedTime * 10) * 0.3 + 1;
      setMouthScale(speakAnimation);
    } else {
      setMouthScale(1);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Eyes */}
      <group ref={eyesRef} position={[0, 1.7, 0.6]}>
        <mesh position={[-0.25, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.25, 0, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
        <mesh position={[0.25, 0, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>
      </group>

      {/* Nose */}
      <mesh position={[0, 1.4, 0.7]}>
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Mouth */}
      <mesh 
        ref={mouthRef} 
        position={[0, 1.2, 0.6]} 
        scale={[mouthScale, mouthScale, 1]}
      >
        <sphereGeometry args={[0.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={isSpeaking ? "#ff6b6b" : "#8b5cf6"} 
          transparent 
          opacity={0.8}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.5, 16]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.9, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.9, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Hands */}
      <mesh position={[-1.2, -0.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[1.2, -0.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Speech indicator */}
      {isSpeaking && (
        <group position={[0, 2.8, 0]}>
          <Center>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.1}
              height={0.02}
              curveSegments={12}
            >
              Speaking...
              <meshStandardMaterial color="#4ade80" />
            </Text3D>
          </Center>
        </group>
      )}

      {/* Floating particles around avatar when speaking */}
      {isSpeaking && (
        <group>
          {[...Array(6)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 6) * Math.PI * 2) * 2,
                1.5 + Math.sin(Date.now() * 0.001 + i) * 0.5,
                Math.sin((i / 6) * Math.PI * 2) * 2
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial 
                color="#60a5fa" 
                transparent 
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
