import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

const Models = [
  { title: 'Box', url: './models/box.glb' },
  { title: 'Plant 1', url: './models/plant-1.glb' },
  { title: 'Plant 2', url: './models/plant-2.glb' },
]

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function App() {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
  })

  return (
    <>
      <Canvas camera={{ position: [0.5, 0, -0.2], near: 0.025 }}>
        <Environment files="./img/abandoned_greenhouse_4k.hdr" background />
        <group>
          <Model
            url={Models[Models.findIndex((m) => m.title === title)].url}
          />
        </group>
        <OrbitControls  />
        <Stats />
      </Canvas>
      <span id="info">The {title} is selected.</span>
    </>
  )
}