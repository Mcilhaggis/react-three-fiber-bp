import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  useGLTF,
  OrbitControls,
  Environment,
  Stats,
  Html,
} from '@react-three/drei'
import { useControls } from 'leva'
import Models from './models'

function Model({ url }) {
  const { scene } = useGLTF(url)
  // Creating a cache to store the annotations
  const [cache, setCache] = useState({})

  if (!cache[url]) {
    const annotations = []

    scene.traverse((o) => {
      if (o.userData.prop) {
        annotations.push(
          <Html
            key={o.uuid}
            position={[o.position.x, o.position.y, o.position.z]}
            // Having this set to true will fix the labels into palce and not rotate with the personal view
            transform
            distanceFactor={0.25}
            // occlude would hide any of the values that we placed inside of the mesh
            // occlude

          >
            {/* Is the value of the string applied in Blender */}
            <div className="annotation">{o.userData.prop}</div>
          </Html>
        )
      }
    })

    console.log('Caching JSX for url ' + url)
    // This code with allow us to build up the content stored in the scene, it will append new values
    setCache({
      ...cache,
      [url]: <primitive object={scene}>{annotations}</primitive>,
    })
  }
  return cache[url]
}

export default function App() {
  const { model } = useControls({
    model: {
      value: 'box',
      options: Object.keys(Models),
    },
  })

  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <Environment files="./img/abandoned_greenhouse_4k.hdr" background />
        <group>
          <Model url={Models[model]} />
        </group>
        <OrbitControls  />
        <Stats />
      </Canvas>
      <span id="info">
        The {model.replace(/([A-Z])/g, ' $1').toLowerCase()} is selected.
      </span>
    </>
  )
}