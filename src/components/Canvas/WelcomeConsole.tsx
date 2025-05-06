
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, useTexture } from '@react-three/drei';
import { Mesh, Group, MeshStandardMaterial } from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

interface WelcomeConsoleProps {
  position: [number, number, number];
  isActive: boolean;
  onLoaded: () => void;
}

const WelcomeConsole = ({ position, isActive, onLoaded }: WelcomeConsoleProps) => {
  const groupRef = useRef<Group>(null);
  const screenRef = useRef<Mesh>(null);
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);
  
  // Load texture for the console screen
  const screenTexture = useTexture('/placeholder.svg');
  
  useEffect(() => {
    if (groupRef.current) {
      onLoaded();
    }
  }, [onLoaded]);

  // Animation effects
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotate slightly towards the camera when active
      if (isActive) {
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
    }
    
    if (screenRef.current) {
      const material = screenRef.current.material as MeshStandardMaterial;
      material.emissiveIntensity = hovered ? 2 : 1 + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });
  
  return (
    <group ref={groupRef} position={position} scale={isActive ? 1 : 0.5}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Console base */}
        <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[4, 0.2, 2]} />
          <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Console screen */}
        <mesh 
          ref={screenRef} 
          position={[0, 0.5, 0]} 
          rotation={[0, 0, 0]}
          castShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[3.8, 2, 0.1]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            emissive="#4CC9F0"
            emissiveIntensity={1}
            metalness={0.5} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Main text */}
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
        >
          BHARATH KUMAR K
        </Text>
        
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          fontFamily="Inter"
        >
          Full-Stack Developer
        </Text>
        
        {/* Links */}
        <Text
          position={[-1.2, -0.4, 0.1]}
          fontSize={0.15}
          color="#4CC9F0"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
          onClick={() => window.open('https://github.com/bharathkumar', '_blank')}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          GITHUB
        </Text>
        
        <Text
          position={[-0.4, -0.4, 0.1]}
          fontSize={0.15}
          color="#F72585"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
          onClick={() => window.open('mailto:bharathkumar@example.com', '_blank')}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          EMAIL
        </Text>
        
        <Text
          position={[0.4, -0.4, 0.1]}
          fontSize={0.15}
          color="#4ADE80"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
          onClick={() => window.open('/resume.pdf', '_blank')}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          RESUME
        </Text>
        
        <Text
          position={[1.2, -0.4, 0.1]}
          fontSize={0.15}
          color="#FCD34D"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
          fontFamily="JetBrains Mono"
          onClick={() => window.open('https://bharathkumar.dev', '_blank')}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          WEBSITE
        </Text>
      </Float>
    </group>
  );
};

export default WelcomeConsole;
