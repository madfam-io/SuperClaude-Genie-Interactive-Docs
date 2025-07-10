'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Text3D, 
  Environment, 
  Sparkles, 
  OrbitControls,
  useGLTF,
  Center,
  Html
} from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Animated 3D Text Component
function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Center>
      <Text3D
        ref={textRef}
        font="/fonts/Inter_Bold.json"
        size={1}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        SuperClaude
        <meshStandardMaterial
          color={hovered ? '#0070f3' : '#ffffff'}
          emissive={hovered ? '#0070f3' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
          roughness={0.1}
          metalness={0.8}
        />
      </Text3D>
    </Center>
  )
}

// Floating Geometric Shapes
function FloatingGeometry() {
  const count = 20
  const shapes = []
  
  for (let i = 0; i < count; i++) {
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ]
    
    const geometry = Math.random() > 0.5 ? 'box' : 'sphere'
    const scale = Math.random() * 0.3 + 0.1
    
    shapes.push(
      <Float
        key={i}
        speed={1 + Math.random() * 2}
        rotationIntensity={0.5 + Math.random() * 0.5}
        floatIntensity={0.5 + Math.random() * 0.5}
        position={position}
      >
        <mesh scale={scale}>
          {geometry === 'box' ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <sphereGeometry args={[0.5, 32, 32]} />
          )}
          <meshStandardMaterial
            color={`hsl(${Math.random() * 360}, 70%, 60%)`}
            emissive={`hsl(${Math.random() * 360}, 70%, 20%)`}
            emissiveIntensity={0.1}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    )
  }
  
  return <>{shapes}</>
}

// Particle System
function ParticleSystem() {
  const meshRef = useRef<THREE.Points>(null)
  const particlesCount = 1000
  
  const positions = new Float32Array(particlesCount * 3)
  const colors = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    
    colors[i * 3] = Math.random()
    colors[i * 3 + 1] = Math.random()
    colors[i * 3 + 2] = Math.random()
  }
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Interactive Camera Controller
function CameraController() {
  const { camera } = useThree()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  useFrame(() => {
    camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.05
    camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Loading Component
function Loader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-blue"></div>
      </div>
    </Html>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0070f3" />
      <pointLight position={[10, -10, 10]} intensity={0.5} color="#7c3aed" />
      
      <AnimatedText />
      <FloatingGeometry />
      <ParticleSystem />
      <CameraController />
      
      <Sparkles
        count={100}
        scale={20}
        size={2}
        speed={0.5}
        opacity={0.6}
        color="#0070f3"
      />
      
      <Environment preset="city" />
    </>
  )
}

export default function Hero3D() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  if (!isClient) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-6xl font-bold text-text-primary mb-4">
            SuperClaude
          </div>
          <div className="text-text-secondary">Loading 3D Experience...</div>
        </div>
      </div>
    )
  }
  
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* 3D Canvas */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center glass-light px-4 py-2 rounded-full"
          >
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse mr-2" />
            <span className="text-sm text-text-secondary">Powered by AI</span>
          </motion.div>
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-text-primary">
              SuperClaude
              <span className="block text-4xl md:text-6xl text-accent-blue">
                Genie
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Transform your development workflow with intelligent command generation 
            and AI-powered assistance
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => {
                const element = document.getElementById('dashboard')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-modern bg-accent-blue hover:bg-accent-blue/80 text-white px-8 py-4 text-lg font-semibold"
            >
              Get Started
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('features')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-modern border-accent-purple text-accent-purple hover:bg-accent-purple/10 px-8 py-4 text-lg font-semibold"
            >
              Learn More
            </button>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center">
                <div className="w-1 h-3 bg-text-muted rounded-full mt-2 animate-bounce-gentle" />
              </div>
              <span className="text-xs text-text-muted">Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
    </section>
  )
}