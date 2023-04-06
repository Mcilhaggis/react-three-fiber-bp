import { Stats, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment } from '@react-three/drei'

export default function App() {
  const gltf = useLoader(GLTFLoader, './models/monkey.glb')

  return (
    <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
      {/* <directionalLight position={[2.3, 1.0, 3.4]} castShadow /> */}
      <primitive
        object={gltf.scene}
        position={[0, 1, 0]}
        children-0-castShadow
      />
      <directionalLight position={[3.3, 8.5, 4.4]} intensity={4}>
        {/* adding in sphere can help to decipher where the light should be positioned to most acurately represent the HDR light source */}
        <Sphere args={[0.25]}></Sphere>
      </directionalLight>
      {/* A grat alternative to using lighting  */}
      <Environment files='./img/brown_photostudio_02_4k.hdr' background blur={0.06}/>
      {/* this is the floor */}
      {/* <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial />
      </Circle> */}
      <OrbitControls target={[0, 1, 0]} />
      <axesHelper args={[5]} />
      <Stats />
    </Canvas>
  )
} 