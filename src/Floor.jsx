export default function Floor() {
    return (
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
            <circleGeometry args={[10]} />
            {/* You need to make sure that the material can recieve shadows - meshPhong and meshStandard can,  mesh normal or basic does not */}
            {/* all mesh can CAST shadows but not all can receive */}
            <meshStandardMaterial />
        </mesh>
    )
}