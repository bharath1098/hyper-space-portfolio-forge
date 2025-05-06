
import { Text } from '@react-three/drei';

interface CubeFaceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  faceIndex: number;
  color: string;
  title: string;
  items: string[];
  isHovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
}

const CubeFace = ({ 
  position,
  rotation,
  color,
  faceIndex,
  title,
  items,
  isHovered,
  onPointerOver,
  onPointerOut
}: CubeFaceProps) => {
  return (
    <mesh 
      position={position} 
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.5} 
        roughness={0.2} 
        emissive={isHovered ? color : "#000000"}
        emissiveIntensity={isHovered ? 0.5 : 0}
      />
      <Text
        position={[0, 1, 0.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        {title}
      </Text>
      {items.map((item, i) => (
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
  );
};

export default CubeFace;
