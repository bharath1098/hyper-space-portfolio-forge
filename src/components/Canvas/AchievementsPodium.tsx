
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { Group } from 'three';

interface AchievementsPodiumProps {
  position: [number, number, number];
  isActive: boolean;
}

const AchievementsPodium = ({ position, isActive }: AchievementsPodiumProps) => {
  const groupRef = useRef<Group>(null);
  
  // Achievements data
  const achievements = [
    {
      title: "Employee Excellence Award",
      description: "Recognized for exceptional contributions to Zoom SDK integration",
      year: "2023"
    },
    {
      title: "25% Usage Increase",
      description: "Led Zoom SDK integration that boosted platform usage by 25%",
      year: "2022"
    },
    {
      title: "Open Source Contributor",
      description: "Regular contributor to React and Node.js open source projects",
      year: "2021"
    }
  ];
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Scale animation when active
      groupRef.current.scale.lerp(
        isActive ? [1, 1, 1] : [0.3, 0.3, 0.3],
        0.05
      );
      
      // Subtle rotation when not active
      if (!isActive) {
        groupRef.current.rotation.y += delta * 0.1;
      } else {
        // Smoothly rotate to front when active
        groupRef.current.rotation.y = groupRef.current.rotation.y * 0.95;
      }
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="#FCD34D"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        ACHIEVEMENTS
      </Text>
      
      {/* Podium base */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.5, 3]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Achievement podiums */}
      {achievements.map((achievement, index) => {
        // Position the podiums next to each other
        const x = (index - 1) * 2;
        // Different heights for visual interest
        const height = 1 + (index === 1 ? 0.5 : 0);
        
        return (
          <Float 
            key={index} 
            speed={1} 
            rotationIntensity={0.1} 
            floatIntensity={0.2}
          >
            <group position={[x, -0.25, 0]}>
              {/* Podium pillar */}
              <mesh position={[0, -0.5 + height/2, 0]} castShadow receiveShadow>
                <boxGeometry args={[1, height, 1]} />
                <meshStandardMaterial 
                  color="#0F172A" 
                  metalness={0.5} 
                  roughness={0.2}
                  emissive="#FCD34D"
                  emissiveIntensity={0.1}
                />
              </mesh>
              
              {/* Trophy or award icon */}
              <mesh position={[0, height - 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.3, 0.5, 16]} />
                <meshStandardMaterial 
                  color="#FCD34D" 
                  metalness={0.8} 
                  roughness={0.2}
                  emissive="#FCD34D"
                  emissiveIntensity={0.5}
                />
              </mesh>
              
              {/* Achievement title */}
              <Text
                position={[0, height + 0.3, 0]}
                fontSize={0.18}
                color="#FCD34D"
                anchorX="center"
                anchorY="middle"
                font="/fonts/JetBrainsMono-Bold.woff"
                maxWidth={1.8}
              >
                {achievement.title}
              </Text>
              
              {/* Achievement description */}
              <Text
                position={[0, height, 0]}
                fontSize={0.12}
                color="#F8FAFC"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Regular.woff"
                maxWidth={1.8}
              >
                {achievement.description}
              </Text>
              
              {/* Year */}
              <Text
                position={[0, height - 0.25, 0]}
                fontSize={0.15}
                color="#4CC9F0"
                anchorX="center"
                anchorY="middle"
                font="/fonts/JetBrainsMono-Bold.woff"
              >
                {achievement.year}
              </Text>
            </group>
          </Float>
        );
      })}
    </group>
  );
};

export default AchievementsPodium;
