import type React from 'react'
import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

type ImageItem = string | { src: string; alt?: string }

interface InfiniteGalleryProps {
  images: ImageItem[]
  speed?: number
  visibleCount?: number
  className?: string
  style?: React.CSSProperties
}

interface PlaneData {
  index: number
  z: number
  imageIndex: number
  x: number
  y: number
}

const DEPTH = 50
const GOLDEN = 2.618

const createClothMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float d = length(pos.xy);
        float curve = d * d * curveIntensity;
        float r1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float r2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float cloth = (r1 + r2) * abs(curveIntensity) * 2.0;
        float flag = 0.0;
        if (isHovered > 0.5) {
          float phase = pos.x * 3.0 + time * 8.0;
          float damp = smoothstep(-0.5, 0.5, pos.x);
          flag = sin(phase) * 0.1 * damp + sin(pos.x * 5.0 + time * 12.0) * 0.03 * damp;
        }
        pos.z -= (curve + cloth + flag);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 ts = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              float w = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + vec2(x, y) * ts * blurAmount) * w;
              total += w;
            }
          }
          color = blurred / total;
        }
        color.rgb += vec3(abs(scrollForce) * 0.05 * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  })

function GalleryScene({ images, speed = 1, visibleCount = 10 }: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
  const [scrollVel, setScrollVel] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const lastAction = useRef(Date.now())

  const normalized = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  )

  const textures = useTexture(normalized.map((i) => i.src))

  const materials = useMemo(
    () => Array.from({ length: visibleCount! }, () => createClothMaterial()),
    [visibleCount]
  )

  const positions = useMemo(
    () =>
      Array.from({ length: visibleCount! }, (_, i) => ({
        x: (Math.sin((i * GOLDEN) % (Math.PI * 2)) * (i % 3) * 1.2 * 8) / 3,
        y: (Math.cos((i * 1.618 + Math.PI / 3) % (Math.PI * 2)) * ((i + 1) % 4) * 0.8 * 8) / 4,
      })),
    [visibleCount]
  )

  const planesRef = useRef<PlaneData[]>(
    Array.from({ length: visibleCount! }, (_, i) => ({
      index: i,
      z: ((DEPTH / visibleCount!) * i) % DEPTH,
      imageIndex: i % images.length,
      x: positions[i]?.x ?? 0,
      y: positions[i]?.y ?? 0,
    }))
  )

  const meshesRef = useRef<(THREE.Mesh | null)[]>(Array(visibleCount).fill(null))

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      setScrollVel((p) => p + e.deltaY * 0.01 * (speed ?? 1))
      setAutoPlay(false)
      lastAction.current = Date.now()
    },
    [speed]
  )

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false })
      return () => canvas.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastAction.current > 3000) setAutoPlay(true)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useFrame((_, delta) => {
    if (autoPlay) setScrollVel((p) => p + 0.25 * delta)
    setScrollVel((p) => p * 0.95)

    const time = performance.now() / 1000
    materials.forEach((mat) => {
      if (mat?.uniforms) {
        mat.uniforms.time.value = time
        mat.uniforms.scrollForce.value = scrollVel
      }
    })

    const total = images.length
    const advance = visibleCount! % total || total
    const half = DEPTH / 2

    planesRef.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVel * delta * 10
      let wFwd = 0, wBck = 0

      if (newZ >= DEPTH) { wFwd = Math.floor(newZ / DEPTH); newZ -= DEPTH * wFwd }
      if (newZ < 0) { wBck = Math.ceil(-newZ / DEPTH); newZ += DEPTH * wBck }

      if (wFwd > 0) plane.imageIndex = (plane.imageIndex + wFwd * advance) % total
      if (wBck > 0) { const s = plane.imageIndex - wBck * advance; plane.imageIndex = ((s % total) + total) % total }

      plane.z = ((newZ % DEPTH) + DEPTH) % DEPTH
      plane.x = positions[i]?.x ?? 0
      plane.y = positions[i]?.y ?? 0

      const norm = plane.z / DEPTH
      let opacity = 1
      if (norm < 0.05) opacity = 0
      else if (norm < 0.15) opacity = (norm - 0.05) / 0.1
      else if (norm > 0.9) opacity = 0
      else if (norm > 0.85) opacity = 1 - (norm - 0.85) / 0.05

      let blur = 0
      if (norm < 0.1) blur = 8 * (1 - norm / 0.1)
      else if (norm > 0.9) blur = 8 * ((norm - 0.9) / 0.1)

      const mat = materials[i]
      if (mat?.uniforms) {
        mat.uniforms.opacity.value = Math.max(0, Math.min(1, opacity))
        mat.uniforms.blurAmount.value = Math.max(0, Math.min(8, blur))
        const texture = textures[plane.imageIndex]
        if (texture && mat.uniforms.map.value !== texture) {
          mat.uniforms.map.value = texture
          mat.needsUpdate = true
        }
      }

      const mesh = meshesRef.current[i]
      if (mesh) mesh.position.set(plane.x, plane.y, plane.z - half)
    })
  })

  return (
    <>
      {planesRef.current.map((plane, i) => {
        const texture = textures[plane.imageIndex]
        const mat = materials[i]
        if (!texture || !mat) return null

        const img = texture.image as { width?: number; height?: number } | null
        const aspect = img?.width && img?.height ? img.width / img.height : 1
        const scale: [number, number, number] = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1]

        return (
          <mesh
            key={plane.index}
            ref={(el) => { meshesRef.current[i] = el }}
            position={[plane.x, plane.y, plane.z - DEPTH / 2]}
            scale={scale}
            material={mat}
            onPointerEnter={() => { if (mat?.uniforms) mat.uniforms.isHovered.value = 1.0 }}
            onPointerLeave={() => { if (mat?.uniforms) mat.uniforms.isHovered.value = 0.0 }}
          >
            <planeGeometry args={[1, 1, 32, 32]} />
          </mesh>
        )
      })}
    </>
  )
}

function Fallback({ images }: { images: ImageItem[] }) {
  const imgs = images.map((i) => (typeof i === 'string' ? { src: i, alt: '' } : i))
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 h-full overflow-auto">
      {imgs.map((img, i) => (
        <img key={i} src={img.src} alt={img.alt} className="w-full aspect-[4/3] object-cover" />
      ))}
    </div>
  )
}

export default function InfiniteGallery({ images, speed = 1, visibleCount = 10, className = 'h-screen w-full', style }: InfiniteGalleryProps) {
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    try {
      const c = document.createElement('canvas')
      if (!c.getContext('webgl') && !c.getContext('experimental-webgl' as 'webgl')) setWebgl(false)
    } catch { setWebgl(false) }
  }, [])

  if (!webgl) return <div className={className} style={style}><Fallback images={images} /></div>

  return (
    <div className={className} style={style}>
      <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <GalleryScene images={images} speed={speed} visibleCount={visibleCount} />
      </Canvas>
    </div>
  )
}
