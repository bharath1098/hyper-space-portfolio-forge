
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { RefObject } from 'react';

interface CubeAnimationProps {
  cubeRef: RefObject<Group>;
  isActive: boolean;
  hoveredFace: number | null;
}

const CubeAnimation = ({ cubeRef, isActive, hoveredFace }: CubeAnimationProps) => {
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
      const targetScale: [number, number, number] = isActive ? [1.2, 1.2, 1.2] : [0.5, 0.5, 0.5];
      cubeRef.current.scale.lerp(new Vector3(...targetScale), 0.05);
    }
  });

  return null; // This is a logic component, so it doesn't render anything
};

export default CubeAnimation;
