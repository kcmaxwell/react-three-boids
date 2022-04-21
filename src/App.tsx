import "./styles.css";
import * as THREE from "three";
import { Canvas, useFrame, MeshProps } from "@react-three/fiber";
import { OrbitControls, Edges, Instances, Instance } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { AmbientLight } from "three";

const randomPosition = (r: number) =>
  new THREE.Vector3(
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r
  );

const initialPositions = Array.from({ length: 10 }, () => ({
  position: randomPosition(0)
}));

const Box = () => {
  const mesh = useRef<THREE.Mesh>();

  useFrame((state, delta) => {
    //mesh.current.rotation.y += 1 * delta;
  });

  return (
    <mesh ref={mesh} scale={[2, 2, 2]}>
      <boxBufferGeometry args={[3, 1.5, 3]} />
      <meshPhongMaterial visible={false} />
      <Edges />
    </mesh>
  );
};

const Boid = (props: MeshProps) => {
  const mesh = useRef();

  return (
    <group {...props}>
      <Instance ref={mesh} />
    </group>
  );
};

const Boids = () => {
  return (
    <Instances limit={10}>
      <coneBufferGeometry args={[0.1, 0.3, 24]} />
      <meshPhongMaterial color="#099AD9" />
      {initialPositions.map((props, i) => (
        <Boid key={i} {...props} />
      ))}
    </Instances>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={"Loading..."}>
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          <OrbitControls />
          <Boids />
          <Box />
        </Suspense>
      </Canvas>
    </div>
  );
}
