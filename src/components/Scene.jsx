import { Suspense, useLayoutEffect, useRef, useMemo, Component } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import * as THREE from 'three'


class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[Camera model failed to load]', error, info)
  }
  render() {
    if (this.state.error) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

function FallbackCube() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.6
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 0.4, 0.4]} />
      <meshStandardMaterial color="#7b5cff" emissive="#7b5cff" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Camera({ scrollRef }) {
  const group = useRef()
  const { scene } = useGLTF(
    '/camera_zorki_-_4.glb',
    // '/smartwatch.glb',
    undefined,
    undefined,
    (error) => console.error('[useGLTF loader error]', error)
  )
  const model = useMemo(() => scene.clone(true), [scene])

    useLayoutEffect(() => {
    model.traverse((child) => {
      if (!child.isMesh || !child.material) return
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((mat) => {
        mat.side = THREE.DoubleSide
        mat.needsUpdate = true
      })
    })
  }, [model])


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const scrollNorm = scrollRef.current // 0..1 across whole page

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.25) * 0.08 + scrollNorm * Math.PI * 0.22
      group.current.rotation.x = 0.08 + Math.sin(t * 0.35) * 0.03 + scrollNorm * 0.18
      group.current.rotation.z = Math.sin(t * 0.18) * 0.02 + scrollNorm * 0.05
      group.current.position.y = 0.05 + Math.sin(t * 1.1) * 0.04 - scrollNorm * 0.05
      group.current.position.x = 0.05
    }
  })

  return (
    <group ref={group} scale={3} position={[10, -5, 200]}>
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  )
}

useGLTF.preload('/camera_zorki_-_4.glb')
// useGLTF.preload('/smartwatch.glb')

function Particles() {
  const ref = useRef()
  const count = 500
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 16
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#4f3aad" size={0.018} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

function CameraRig({ scrollRef }) {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x += (Math.sin(t * 0.15) * 0.15 - camera.position.x) * 0.02
    // Was -scrollRef.current * 0.6 — panning down that far while the model
    // is also moving/rotating pushed the glasses out of frame on scroll.
    camera.lookAt(0, 0 - scrollRef.current * 0.12, 0)
  })
  return null
}

function ForceCanvasSize() {
  const { gl, setSize } = useThree()

  useLayoutEffect(() => {
    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setSize(width, height)
      gl.setSize(width, height, false)
      gl.domElement.width = width
      gl.domElement.height = height
      gl.domElement.style.width = '100%'
      gl.domElement.style.height = '100%'
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [gl, setSize])

  return null
}

export default function Scene({ scrollRef }) {
  return (
    <div className="canvas-shell">
      <Canvas
        className="canvas-layer"
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl, setSize }) => {
          setSize(window.innerWidth, window.innerHeight)
          gl.setSize(window.innerWidth, window.innerHeight, false)
          gl.domElement.width = window.innerWidth
          gl.domElement.height = window.innerHeight
          gl.domElement.style.width = '100%'
          gl.domElement.style.height = '100%'
        }}
        camera={{ position: [0, 0, 1000], fov: 52 }}
        // camera={{ position: [0, 0, 0], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0c10']} />
        <ambientLight intensity={1} />
        <hemisphereLight intensity={0.85} color="#aeaecd" groundColor="#0a0c10" />
        <directionalLight position={[3, 4, 6]} intensity={2.2} color="#e7ecf2" />
        <pointLight position={[3, 3, 4]} intensity={1.8} color="#7b5cff" />
        <pointLight position={[-3, -2, 3]} intensity={0.7} color="#f3f1ed" />

        <ForceCanvasSize />
        {/* <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial color="#00ff9d" />
        </mesh> */}
        <Suspense fallback={<FallbackCube />}>
          <ModelErrorBoundary fallback={<FallbackCube />}>
            <Camera scrollRef={scrollRef} />
          </ModelErrorBoundary>
        </Suspense>
        <Particles />
        <CameraRig scrollRef={scrollRef} />
      </Canvas>
    </div>
  )
}
