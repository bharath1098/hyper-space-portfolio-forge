
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Vector3 } from 'three';
import LoadingScreen from '../UI/LoadingScreen';
import WelcomeConsole from './WelcomeConsole';
import SkillsCube from './SkillsCube';
import ExperienceTimeline from './ExperienceTimeline';
import ProjectZone from './ProjectZone';
import AchievementsPodium from './AchievementsPodium';
import Navigation from '../UI/Navigation';
import Controls from '../UI/Controls';

const Scene = () => {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [isLoading, setIsLoading] = useState(true);

  // Camera positions for each section as tuples with fixed length
  const cameraPositions: Record<string, [number, number, number]> = {
    welcome: [0, 0, 10],
    skills: [10, 2, 5],
    experience: [-5, 0, 8],
    projects: [0, -5, 8],
    achievements: [5, -2, 10],
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <div className="relative w-full h-screen">
      {isLoading && <LoadingScreen />}
      
      <Canvas shadows>
        <Suspense fallback={null}>
          <fog attach="fog" args={['#070b1a', 10, 50]} />
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.5} 
            castShadow 
            shadow-mapSize={1024} 
          />
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#8B5CF6" />
          
          <PerspectiveCamera
            makeDefault
            position={cameraPositions[currentSection as keyof typeof cameraPositions]}
            fov={60}
            near={0.1}
            far={100}
          />
          
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            enableDamping
            dampingFactor={0.05}
          />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* Main Components */}
          <WelcomeConsole position={[0, 0, 0]} isActive={currentSection === 'welcome'} onLoaded={() => setIsLoading(false)} />
          <SkillsCube position={[10, 2, 0]} isActive={currentSection === 'skills'} />
          <ExperienceTimeline position={[-5, 0, 0]} isActive={currentSection === 'experience'} />
          <ProjectZone position={[0, -5, 0]} isActive={currentSection === 'projects'} />
          <AchievementsPodium position={[5, -2, 0]} isActive={currentSection === 'achievements'} />
        </Suspense>
      </Canvas>
      
      <Navigation currentSection={currentSection} onNavigate={handleSectionChange} />
      <Controls />
    </div>
  );
};

export default Scene;
