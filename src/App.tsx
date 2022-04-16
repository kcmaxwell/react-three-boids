import "./styles.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { Suspense, useRef } from "react";

const Box = () => {
  const mesh = useRef();

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

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={"Loading..."}>
          <OrbitControls />
          <Box />
        </Suspense>
      </Canvas>
    </div>
  );
}
