import { Canvas } from '@react-three/fiber'
import Box from './Box'
import { Stats, OrbitControls } from '@react-three/drei'
import useKeyboard from './usekeyboard'

export default function App() {
  const keyMap = useKeyboard()


  return (
    <Canvas camera={{ position: [1, 2, 3] }} >
      <Box position={[-1.5, 0.5, 0.5]} keyMap={keyMap} />
      <Box position={[0, 0.5, 0.5]} keyMap={keyMap} />
      <Box position={[1.5, 0.5, 0.5]} keyMap={keyMap} />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
      <Stats />
    </Canvas>
  )
}