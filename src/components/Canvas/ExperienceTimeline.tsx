import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { Group, Mesh, Vector3 } from 'three';

interface ExperienceTimelineProps {
  position: [number, number, number];
  isActive: boolean;
}

const ExperienceTimeline = ({ position, isActive }: ExperienceTimelineProps) => {
  const groupRef = useRef<Group>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Experience data
  const experiences = [
    {
      company: "Kineticloud",
      role: "Senior Full Stack Developer",
      period: "2021 - Present",
      highlights: ["Integrated Zoom SDK boosting usage by 25%", "Built responsive IoT dashboards", "Led team of 5 developers"]
    },
    {
      company: "Gaian Solutions",
      role: "Full Stack Developer",
      period: "2018 - 2021",
      highlights: ["Developed eCommerce backend APIs", "Optimized database queries by 40%", "Implemented CI/CD pipelines"]
    },
    {
      company: "AccioJob",
      role: "Frontend Developer",
      period: "2016 - 2018",
      highlights: ["Created interactive learning modules", "Built UI component library", "Improved page load speed by 30%"]
    }
  ];
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Scale animation when active
      const targetScale: [number, number, number] = isActive ? [1, 1, 1] : [0.3, 0.3, 0.3];
      groupRef.current.scale.lerp(new Vector3(...targetScale), 0.05);
      
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
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#4CC9F0"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        EXPERIENCE
      </Text>
      
      {/* Experience cards on a curved path */}
      {experiences.map((exp, index) => {
        // Calculate position on a curve
        const angle = (index - 1) * Math.PI / 4;
        const radius = 4;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <Float 
            key={index} 
            speed={2} 
            rotationIntensity={0.2} 
            floatIntensity={0.5}
            position={[x, 0, z]}
          >
            <group
              rotation={[0, -angle, 0]} // Face towards center
              onPointerOver={() => {
                setHoveredCard(index);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                setHoveredCard(null);
                document.body.style.cursor = 'auto';
              }}
            >
              {/* Card background */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial 
                  color={hoveredCard === index ? "#1E293B" : "#0F172A"} 
                  metalness={0.5} 
                  roughness={0.2}
                  emissive={hoveredCard === index ? "#8B5CF6" : "#000000"}
                  emissiveIntensity={0.2}
                />
              </mesh>
              
              {/* Company name */}
              <Text
                position={[0, 0.7, 0.06]}
                fontSize={0.25}
                color="#8B5CF6"
                anchorX="center"
                anchorY="middle"
                font="/fonts/JetBrainsMono-Bold.woff"
              >
                {exp.company}
              </Text>
              
              {/* Role */}
              <Text
                position={[0, 0.3, 0.06]}
                fontSize={0.18}
                color="#F8FAFC"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Regular.woff"
              >
                {exp.role}
              </Text>
              
              {/* Period */}
              <Text
                position={[0, 0, 0.06]}
                fontSize={0.15}
                color="#94A3B8"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Inter-Regular.woff"
              >
                {exp.period}
              </Text>
              
              {/* Highlights */}
              {exp.highlights.map((highlight, i) => (
                <Text
                  key={i}
                  position={[0, -0.3 - i * 0.25, 0.06]}
                  fontSize={0.12}
                  color={hoveredCard === index ? "#F8FAFC" : "#94A3B8"}
                  anchorX="center"
                  anchorY="middle"
                  font="/fonts/Inter-Regular.woff"
                  maxWidth={2.8}
                >
                  • {highlight}
                </Text>
              ))}
            </group>
          </Float>
        );
      })}
    </group>
  );
};

export default ExperienceTimeline;
