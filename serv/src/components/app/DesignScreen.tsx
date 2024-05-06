import styled, { css } from "styled-components"
import React, { useState } from "react"
import Image from "next/image"

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  // margin-top: -2.5rem;
  z-index: 1;
`

const StyledImage = styled(Image)<{
  hidden
  opacity
}>`
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  ${(v) => css`
    opacity: ${v.hidden ? 0 : v.opacity ? 0.5 : 1};
  `}
`

const StyledButton = styled.button`
  top: 5%;
  right: 0;
  position: absolute;
  width: 5rem;
  height: 1.5rem;
  pointer-events: all;
`

const StyledButton2 = styled.button`
  top: 10%;
  right: 0;
  position: absolute;
  width: 5rem;
  height: 1.5rem;
  pointer-events: all;
`

export const DesignScreen = ({ src }: { src: string }) => {
  const [opacity, setOpacity] = useState(true)
  const [hidden, setHidden] = useState(false)

  return (
    <StyledContainer>
      <div
        style={{
          opacity: hidden ? 0 : opacity ? 0.5 : 1,
          position: "absolute",
          backgroundColor: "white",
          width: "100%",
          height: "100%",
        }}
      />
      <StyledImage
        style={{
          opacity: hidden ? 0 : opacity ? 0.5 : 1,
        }}
        hidden={hidden}
        opacity={opacity}
        src={src}
        alt={"design"}
        width={1126}
        height={2437}
      />
      <StyledButton onClick={() => setOpacity((v) => !v)}>
        {"opacity " + (opacity ? "on" : "off")}
      </StyledButton>
      <StyledButton2 onClick={() => setHidden((v) => !v)}>
        {"vis " + (hidden ? "off" : "on")}
      </StyledButton2>
    </StyledContainer>
  )
}
