import React, { useCallback, useRef, useState } from "react"
import { Canvas as FiberCanvas, useFrame } from "@react-three/fiber"
import { Object3D } from "three"
import styled from "styled-components"
import { v4 as uuid } from "uuid"
import { useMount } from "react-use"
import { Center, Text3D } from "@react-three/drei"
import Link from "next/link"

const StyledCanvasContainer = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: #ececec;
`

const StyledCanvas = styled(FiberCanvas)`
  margin-top: 0;
  background: linear-gradient(0.25turn, #ffc500, #ff8b01);
  border: 15px solid #ececec;
  border-radius: 3rem;
`

const StyledNav = styled.div`
  position: absolute;
  right: 6rem;
  top: 2rem;
  a {
    color: white;
    font-weight: bold;
    font-size: 19px;
    margin-left: 1rem;
    padding-bottom: 0.25rem;
    :hover {
      border-bottom: 2px solid white;
    }
  }
`

function Box(props) {
  const meshRef = useRef<Object3D>()
  const [rotX] = useState(Math.random())
  const [rotY] = useState(Math.random())
  const [rotZ] = useState(Math.random())
  const [posY] = useState((5 + Math.random() * 5) / 3)
  const [hovered, setHover] = useState(false)

  useMount(() => {
    if (meshRef.current) {
      meshRef.current.position.x = 25 * Math.random() - 12.5
      if (props.initial) meshRef.current.position.y = Math.random() * 25 - 12.5
      else meshRef.current.position.y = 4 + Math.random() * 10
      meshRef.current.position.z = -11
    }
  })

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotX
      meshRef.current.rotation.y += delta * rotY
      meshRef.current.rotation.z += delta * rotZ
      meshRef.current.position.y -= delta * posY
      if (meshRef.current.position.y < -10) props.onDestroy(props.guid)
    }
  })

  return (
    <mesh
      {...props}
      scale={1.2}
      ref={meshRef}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

const Boxes = () => {
  //
  const [guids, setGuids] = useState([
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    //
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
    uuid(),
  ])
  const [initialGuids, setInitialGuids] = useState([...guids])

  const handleDestroy = useCallback(
    (guid: string) => {
      setGuids([...guids.filter((v) => v !== guid), uuid()])
    },
    [guids]
  )

  return (
    <>
      {guids.map((guid) => (
        <Box
          key={guid}
          guid={guid}
          initial={initialGuids.includes(guid)}
          onDestroy={handleDestroy}
        />
      ))}
    </>
  )
}

let time = 0

const Logo = () => {
  const ref = useRef<Object3D>()

  useFrame((_, delta) => {
    if (ref.current) {
      time += delta * 2
      const sin = Math.sin(time)
      ref.current.rotation.y = sin * Math.PI * 0.05
      ref.current.rotation.x = sin * Math.PI * 0.03
    }
  })

  return (
    //@ts-ignore
    <Center ref={ref} position-z={-8} scale={0.9}>
      {/*@ts-ignore*/}
      <Text3D
        font={"/avenir_bold.json"}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
      >
        Menudget
        <meshStandardMaterial />
      </Text3D>
    </Center>
  )
}

export const Canvas = () => (
  <StyledCanvasContainer>
    <StyledCanvas camera={{ fov: 40 }}>
      <ambientLight />
      <pointLight position={[20, 10, 10]} />
      <Boxes />
      <Logo />
    </StyledCanvas>

    <StyledNav>
      <Link href={"/"}>Home</Link>
      <Link href={"/about"}>About</Link>
      <Link href={"/team"}>Team</Link>
      <Link href={"/contact"}>Contact</Link>
      <Link href={"/cms"}>CMS</Link>
      <Link href={"/docs"}>Docs</Link>
    </StyledNav>
  </StyledCanvasContainer>
)
