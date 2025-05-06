
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { Group, Vector3 } from 'three';

interface ProjectZoneProps {
  position: [number, number, number];
  isActive: boolean;
}

const ProjectZone = ({ position, isActive }: ProjectZoneProps) => {
  const groupRef = useRef<Group>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  
  // Project data
  const projects = [
    {
      title: "Furniture Exchange",
      description: "Marketplace platform for buying and selling second-hand furniture with AR preview",
      tech: ["React", "Node.js", "MongoDB", "AR.js"],
      link: "https://furniture-exchange.com"
    },
    {
      title: "Safety eCommerce",
      description: "Online store for safety equipment with real-time inventory tracking",
      tech: ["Next.js", "Express", "PostgreSQL", "Stripe"],
      link: "https://safety-store.com"
    },
    {
      title: "Movie App",
      description: "Movie discovery platform with personalized recommendations",
      tech: ["React", "Redux", "Firebase", "TMDB API"],
      link: "https://movie-finder.app"
    },
    {
      title: "Revee Streaming",
      description: "Video streaming service with content management system",
      tech: ["React", "Node.js", "AWS S3", "Redis"],
      link: "https://revee-stream.com"
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
  
  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };
  
  return (
    <group ref={groupRef} position={position}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="#F72585"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
      >
        PROJECTS
      </Text>
      
      {/* Project tablets in a grid layout */}
      <group position={[0, 0, 0]}>
        {projects.map((project, index) => {
          // Grid layout: 2x2
          const row = Math.floor(index / 2);
          const col = index % 2;
          const x = (col - 0.5) * 3.5;
          const z = (row - 0.5) * 3.5;
          
          const isExpanded = expandedProject === index;
          
          return (
            <Float 
              key={index} 
              speed={1.5} 
              rotationIntensity={0.2} 
              floatIntensity={0.5}
              position={[x, 0, z]}
            >
              <group
                onClick={() => toggleProject(index)}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                scale={isExpanded ? 1.2 : 1}
              >
                {/* Project tablet */}
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[2.5, isExpanded ? 2 : 1.5, 0.1]} />
                  <meshStandardMaterial 
                    color={isExpanded ? "#1E293B" : "#0F172A"} 
                    metalness={0.5} 
                    roughness={0.2}
                    emissive={isExpanded ? "#F72585" : "#000000"}
                    emissiveIntensity={0.2}
                  />
                </mesh>
                
                {/* Project title */}
                <Text
                  position={[0, isExpanded ? 0.7 : 0.3, 0.06]}
                  fontSize={isExpanded ? 0.22 : 0.18}
                  color="#F72585"
                  anchorX="center"
                  anchorY="middle"
                  font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
                >
                  {project.title}
                </Text>
                
                {/* Only show these details when expanded */}
                {isExpanded && (
                  <>
                    {/* Description */}
                    <Text
                      position={[0, 0.2, 0.06]}
                      fontSize={0.12}
                      color="#F8FAFC"
                      anchorX="center"
                      anchorY="middle"
                      font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                      maxWidth={2.3}
                    >
                      {project.description}
                    </Text>
                    
                    {/* Tech stack */}
                    <Text
                      position={[0, -0.1, 0.06]}
                      fontSize={0.12}
                      color="#4CC9F0"
                      anchorX="center"
                      anchorY="middle"
                      font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
                      maxWidth={2.3}
                    >
                      {project.tech.join(" • ")}
                    </Text>
                    
                    {/* Link */}
                    <Text
                      position={[0, -0.4, 0.06]}
                      fontSize={0.12}
                      color="#4ADE80"
                      anchorX="center"
                      anchorY="middle"
                      font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.link, '_blank');
                      }}
                    >
                      VISIT SITE →
                    </Text>
                  </>
                )}
                
                {/* Show hint when not expanded */}
                {!isExpanded && (
                  <Text
                    position={[0, -0.1, 0.06]}
                    fontSize={0.12}
                    color="#94A3B8"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
                  >
                    Click to expand
                  </Text>
                )}
              </group>
            </Float>
          );
        })}
      </group>
    </group>
  );
};

export default ProjectZone;
