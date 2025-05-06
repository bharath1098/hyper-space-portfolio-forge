
import { useRef, useState } from 'react';
import { Group } from 'three';
import CubeFace from './Skills/CubeFace';
import CubeAnimation from './Skills/CubeAnimation';
import { skills, faceColors } from './Skills/skillsData';

interface SkillsCubeProps {
  position: [number, number, number];
  isActive: boolean;
}

const SkillsCube = ({ position, isActive }: SkillsCubeProps) => {
  const cubeRef = useRef<Group>(null);
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);
  
  // Handle hover events for each face
  const handlePointerOver = (faceIndex: number) => {
    setHoveredFace(faceIndex);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHoveredFace(null);
    document.body.style.cursor = 'auto';
  };
  
  const facePositions: [number, number, number][] = [
    [0, 0, 1.5],    // Front
    [0, 0, -1.5],   // Back
    [1.5, 0, 0],    // Right
    [-1.5, 0, 0],   // Left
    [0, 1.5, 0],    // Top
    [0, -1.5, 0]    // Bottom
  ];
  
  const faceRotations: [number, number, number][] = [
    [0, 0, 0],              // Front
    [0, Math.PI, 0],        // Back
    [0, Math.PI / 2, 0],    // Right
    [0, -Math.PI / 2, 0],   // Left
    [-Math.PI / 2, 0, 0],   // Top
    [Math.PI / 2, 0, 0]     // Bottom
  ];
  
  return (
    <group position={position}>
      <group ref={cubeRef} position={[0, 0, 0]}>
        {/* Apply animation to the cube */}
        <CubeAnimation 
          cubeRef={cubeRef}
          isActive={isActive}
          hoveredFace={hoveredFace}
        />
        
        {/* Render all six faces of the cube */}
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <CubeFace
            key={index}
            position={facePositions[index]}
            rotation={faceRotations[index]}
            faceIndex={index}
            color={faceColors[index]}
            title={skills[index].title}
            items={skills[index].items}
            isHovered={hoveredFace === index}
            onPointerOver={() => handlePointerOver(index)}
            onPointerOut={handlePointerOut}
          />
        ))}
      </group>
    </group>
  );
};

export default SkillsCube;
