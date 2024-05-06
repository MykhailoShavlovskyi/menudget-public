import styled, { css } from "styled-components"

const StyledContainer = styled.div`
  margin-top: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledNode = styled.span<{
  enabled: boolean
}>`
  padding: 0;
  margin: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  font-size: 0.9rem;
  font-weight: bold;
  font-family: Avenir;

  white-space: nowrap;
  background-color: #ffbd02;
  color: white;
  border-radius: 1rem;
  cursor: pointer;

  label {
    position: absolute;
    margin-top: -3.5rem;
    font-size: 1.3rem;
  }

  ${(v) =>
    !v.enabled &&
    css`
      filter: grayscale(100%);
      opacity: 0.6;
    `}
`

const StyledLine = styled.div<{
  enabled: boolean
}>`
  width: 2.2rem;
  height: 4px;
  background-color: #ffbd02;

  ${(v) =>
    !v.enabled &&
    css`
      filter: grayscale(100%);
      opacity: 0.6;
    `}
`

export const SpicyLevelSlider = ({
  level,
  onChange,
}: {
  level: number
  onChange: (v: number) => void
}) => (
  <StyledContainer>
    <StyledNode enabled={level >= 0} onPointerOver={() => onChange(0)}>
      0<label>🤓</label>
    </StyledNode>
    <StyledLine enabled={level >= 1} onPointerOver={() => onChange(1)} />
    <StyledNode enabled={level >= 1} onPointerOver={() => onChange(1)}>
      1<label>😁</label>
    </StyledNode>
    <StyledLine enabled={level >= 2} onPointerOver={() => onChange(2)} />
    <StyledNode enabled={level >= 2} onPointerOver={() => onChange(2)}>
      2<label>😈</label>
    </StyledNode>
    <StyledLine enabled={level >= 3} onPointerOver={() => onChange(3)} />
    <StyledNode enabled={level >= 3} onPointerOver={() => onChange(3)}>
      3<label>🤯</label>
    </StyledNode>
    <StyledLine enabled={level >= 4} onPointerOver={() => onChange(4)} />
    <StyledNode enabled={level >= 4} onPointerOver={() => onChange(4)}>
      4<label>🤬</label>
    </StyledNode>
  </StyledContainer>
)
