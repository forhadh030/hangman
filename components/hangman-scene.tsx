"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"

interface HangmanSceneProps {
  wrongGuesses: number
}

function HangmanModel({ wrongGuesses }: HangmanSceneProps) {
  // No useEffect or useState here to avoid hydration issues

  return (
    <group position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[3, 0.2, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Vertical pole */}
      <mesh position={[-1, 2, 0]} receiveShadow>
        <boxGeometry args={[0.2, 4, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Horizontal pole */}
      <mesh position={[0.2, 4, 0]} receiveShadow>
        <boxGeometry args={[2.6, 0.2, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Rope */}
      <mesh position={[1.4, 3.5, 0]} receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* Head - appears after 1 wrong guess */}
      {wrongGuesses >= 1 && (
        <mesh position={[1.4, 3, 0]} castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#FFE4C4" />
        </mesh>
      )}

      {/* Body - appears after 2 wrong guesses */}
      {wrongGuesses >= 2 && (
        <mesh position={[1.4, 2.2, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 16]} />
          <meshStandardMaterial color="#6A5ACD" />
        </mesh>
      )}

      {/* Left arm - appears after 3 wrong guesses */}
      {wrongGuesses >= 3 && (
        <mesh position={[1, 2.4, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial color="#FFE4C4" />
        </mesh>
      )}

      {/* Right arm - appears after 4 wrong guesses */}
      {wrongGuesses >= 4 && (
        <mesh position={[1.8, 2.4, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial color="#FFE4C4" />
        </mesh>
      )}

      {/* Left leg - appears after 5 wrong guesses */}
      {wrongGuesses >= 5 && (
        <mesh position={[1.2, 1.5, 0]} rotation={[0, 0, Math.PI / 8]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color="#1E90FF" />
        </mesh>
      )}

      {/* Right leg - appears after 6 wrong guesses */}
      {wrongGuesses >= 6 && (
        <mesh position={[1.6, 1.5, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color="#1E90FF" />
        </mesh>
      )}
    </group>
  )
}

export default function HangmanScene({ wrongGuesses }: HangmanSceneProps) {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <HangmanModel wrongGuesses={wrongGuesses} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}