import styled from "styled-components"

const StyledNoContent = styled.div`
  flex: 1;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 2.2rem 1.75rem;

  border: #e5e5e5 2px dashed;
  border-radius: 16px;

  h4 {
    width: 100%;
    text-align: center;
    margin: 0;
    font-family: Avenir;
    font-weight: bold;
    color: #b2b2b2;
    font-size: 1.1rem;
  }
`

export const NoContent = ({ label }: { label: string }) => (
  <StyledNoContent>
    <h4>{label}</h4>
  </StyledNoContent>
)
