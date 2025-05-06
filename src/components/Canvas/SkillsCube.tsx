
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial } from 'three';

interface SkillsCubeProps {
  position: [number, number, number];
  isActive: boolean;
}

const SkillsCube = ({ position, isActive }: SkillsCubeProps) => {
  const cubeRef = useRef<Group>(null);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);
  
  // Skills categories
  const skills = [
    { title: "Languages", items: ["JavaScript", "TypeScript", "Java", "C"] },
    { title: "Frontend", items: ["React", "Next.js", "HTML/CSS", "Three.js"] },
    { title: "Backend", items: ["Express", "Prisma", "Node.js", "Spring"] },
    { title: "Cloud", items: ["Azure", "Vercel", "AWS", "GitHub"] },
    { title: "Databases", items: ["MongoDB", "PostgreSQL", "Redis", "MySQL"] },
    { title: "Tools", items: ["Git", "Docker", "Jest", "Webpack"] }
  ];
  
  // Colors for each face
  const faceColors = [
    "#4CC9F0", // Front - Languages
    "#8B5CF6", // Back - Backend
    "#F72585", // Right - Frontend
    "#4ADE80", // Left - Cloud
    "#FCD34D", // Top - Databases
    "#EC4899"  // Bottom - Tools
  ];

  useFrame((state, delta) => {
    if (cubeRef.current) {
      // Auto-rotate when not hovered or active
      if (!hoveredFace && !isActive) {
        cubeRef.current.rotation.x += delta * 0.2;
        cubeRef.current.rotation.y += delta * 0.3;
      } else if (isActive) {
        // Slow down rotation when active
        cubeRef.current.rotation.x += delta * 0.05;
        cubeRef.current.rotation.y += delta * 0.08;
      }
      
      // Scale up when active
      cubeRef.current.scale.lerp(isActive ? [1.2, 1.2, 1.2] : [0.5, 0.5, 0.5], 0.05);
    }
  });
  
  // Handle hover events for each face
  const handlePointerOver = (faceIndex: number) => {
    setHoveredFace(faceIndex);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHoveredFace(null);
    document.body.style.cursor = 'auto';
  };
  
  return (
    <group position={position}>
      <group ref={cubeRef} position={[0, 0, 0]}>
        {/* Front face */}
        <mesh 
          position={[0, 0, 1.5]} 
          onPointerOver={() => handlePointerOver(0)}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial 
            color={faceColors[0]} 
            metalness={0.5} 
            roughness={0.2} 
            emissive={hoveredFace === 0 ? faceColors[0] : "#000000"}
            emissiveIntensity={hoveredFace === 0 ? 0.5 : 0}
          />
          <Text
            position={[0, 1, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skills[0].title}
          </Text>
          {skills[0].items.map((item, i) => (
            <Text
              key={i}
              position={[0, 0.5 - i * 0.5, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item}
            </Text>
          ))}
        </mesh>

        {/* Back face */}
        <mesh 
          position={[0, 0, -1.5]} 
          rotation={[0, Math.PI, 0]}
          onPointerOver={() => handlePointerOver(1)}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial 
            color={faceColors[1]}
            metalness={0.5} 
            roughness={0.2}
            emissive={hoveredFace === 1 ? faceColors[1] : "#000000"}
            emissiveIntensity={hoveredFace === 1 ? 0.5 : 0}
          />
          <Text
            position={[0, 1, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skills[1].title}
          </Text>
          {skills[1].items.map((item, i) => (
            <Text
              key={i}
              position={[0, 0.5 - i * 0.5, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item}
            </Text>
          ))}
        </mesh>

        {/* Right face */}
        <mesh 
          position={[1.5, 0, 0]} 
          rotation={[0, Math.PI / 2, 0]}
          onPointerOver={() => handlePointerOver(2)}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial 
            color={faceColors[2]} 
            metalness={0.5} 
            roughness={0.2}
            emissive={hoveredFace === 2 ? faceColors[2] : "#000000"}
            emissiveIntensity={hoveredFace === 2 ? 0.5 : 0}
          />
          <Text
            position={[0, 1, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skills[2].title}
          </Text>
          {skills[2].items.map((item, i) => (
            <Text
              key={i}
              position={[0, 0.5 - i * 0.5, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item}
            </Text>
          ))}
        </mesh>

        {/* Left face */}
        <mesh 
          position={[-1.5, 0, 0]} 
          rotation={[0, -Math.PI / 2, 0]}
          onPointerOver={() => handlePointerOver(3)}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial 
            color={faceColors[3]} 
            metalness={0.5} 
            roughness={0.2}
            emissive={hoveredFace === 3 ? faceColors[3] : "#000000"}
            emissiveIntensity={hoveredFace === 3 ? 0.5 : 0}
          />
          <Text
            position={[0, 1, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skills[3].title}
          </Text>
          {skills[3].items.map((item, i) => (
            <Text
              key={i}
              position={[0, 0.5 - i * 0.5, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item}
            </Text>
          ))}
        </mesh>

        {/* Top face */}
        <mesh 
          position={[0, 1.5, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerOver={() => handlePointerOver(4)}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial 
            color={faceColors[4]} 
            metalness={0.5} 
            roughness={0.2}
            emissive={hoveredFace === 4 ? faceColors[4] : "#000000"}
            emissiveIntensity={hoveredFace === 4 ? 0.5 : 0}
          />
          <Text
            position={[0, 1, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skills[4].title}
          </Text>
          {skills[4].items.map((item, i) => (
            <Text
              key={i}
              position={[0, 0.5 - i * 0.5, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item}
            </Text>
          ))}
        </mesh>

        {/* Bottom face */}
        <mesh 
          position={[0, -1.5, 0]} 
          rotation={[Math.PI / 2, 0, 0]}
          onPointerOver={() => handlePointerOver(5)}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial 
            color={faceColors[5]} 
            metalness={0.5} 
            roughness={0.2}
            emissive={hoveredFace === 5 ? faceColors[5] : "#000000"}
            emissiveIntensity={hoveredFace === 5 ? 0.5 : 0}
          />
          <Text
            position={[0, 1, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/JetBrainsMono-Bold.woff"
          >
            {skills[5].title}
          </Text>
          {skills[5].items.map((item, i) => (
            <Text
              key={i}
              position={[0, 0.5 - i * 0.5, 0.1]}
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Inter-Regular.woff"
            >
              {item}
            </Text>
          ))}
        </mesh>
      </group>
    </group>
  );
};

export default SkillsCube;
