import styled, { css } from "styled-components"
import { Button } from "../common/Button"
import { ReactNode } from "react"
import { fillByIndex } from "../../../lib/fillByIndex"
import { Chilli } from "../common/Chilli"
import { DishLabels } from "./DishLabels"
import { currencies } from "../../../lib/currencies"

const StyledContainer = styled.div<{
  open: boolean
}>`
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 100%;
  position: absolute;
  background-color: white;
  transition: left 0.2s ease-in;

  ${(v) =>
    v.open &&
    css`
      left: 0;
    `}
`

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 1.4rem 1.5rem 0.6rem;

  svg {
    margin-top: 1.4rem;
    cursor: pointer;
  }

  h2 {
    width: 50%;
    text-align: center;
    font-size: 1.3rem;
    font-family: Avenir;
    line-height: 1.5rem;
  }
`

const StyledGallery = styled.div`
  width: 100%;
  height: 16.15rem;

  .image-gallery-bullets {
    bottom: -1.5rem;
  }

  .image-gallery-bullet {
    margin: 0 0.35rem;
    box-shadow: none;

    background-color: #e3e3e3 !important;
    border: none !important;
    padding: 4px !important;
    transform: none !important;

    :first-child:last-child {
      display: none;
    }
  }

  .active {
    background-color: #ffbd02 !important;
  }

  .image-gallery-left-nav {
    left: -20px;
  }

  .image-gallery-right-nav {
    right: -20px;
  }

  .image-gallery-left-nav,
  .image-gallery-right-nav {
    color: white;
    filter: drop-shadow(0 0 2px #000000);
    transform: translateY(-50%) scale(0.4);
  }

  img {
    height: 16.15rem;
  }
`

const StyledContent = styled.div<{
  noGalleryBullets?: boolean
}>`
  padding: ${(v) => (v.noGalleryBullets ? "2.6rem" : "2.6rem")} 2.18rem;

  & > div:first-child {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 1.2rem;
    border-bottom: 1.5px solid #f4f4f4;
  }
`

const StyledInfo = styled.div`
  font-family: Avenir;
  width: 75%;

  span {
    color: #b2b2b2;
    font-size: 0.75rem;
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
    letter-spacing: -0.2px;
    line-height: 1.65rem;
    margin-top: 0.4rem;
  }

  p {
    margin: 0;
    margin-top: 0.44rem;
    color: #b2b2b2;
    font-size: 0.77rem;
    letter-spacing: 0.1px;
    line-height: 0.8rem;
  }
`

const StyledCounter = styled.div<{
  cantDecrease: boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.4rem;
  margin-right: 0.55rem;

  div {
    background-color: #ffbd02;
    color: white;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Avenir;
    font-size: 1.18rem;
    font-weight: bolder;
    cursor: pointer;
    letter-spacing: -1px;
    padding-right: 1px;

    :last-child {
      ${(v) =>
        v.cantDecrease &&
        css`
          background-color: #f4f4f4;
          color: white;
        `}
    }
  }

  span {
    margin: 0.45rem 0;
    font-family: Avenir;
    font-weight: bolder;
    font-size: 1rem;
  }
`

const StyledIngredients = styled.div`
  & > div {
    display: flex;
    align-items: flex-end;
    font-family: Avenir;

    h4 {
      display: inline;
      margin: 1.5em 0 0;
      font-weight: bold;
      font-size: 0.97rem;
      letter-spacing: -0.3px;
    }

    p {
      margin: 0;
      color: #b2b2b2;
      font-size: 0.95rem;
      letter-spacing: 0.15px;
      display: flex;

      & > :first-child {
        margin-left: 0.8rem;
      }
    }

    :last-child {
      span {
        margin: 1.2rem 0 0;
        line-height: 1rem;
        color: #b2b2b2;
        font-size: 0.95rem;
        letter-spacing: 0.15px;

        h4 {
          color: black;
          margin: 0;
        }
      }
    }
  }
`

const StyledFooter = styled.div`
  width: 100%;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  padding: 1.5rem 2.5rem 3.2rem 1rem;
  background-color: white;

  span {
    flex: 1;
    font-family: Avenir;
    color: #ffbd02;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
  }

  button {
    font-size: 1.3rem;
    padding: 0.9rem 2.25rem;
  }
`

const StyledChilli = styled(Chilli)`
  margin-bottom: 0;
  transform: scale(0.9);
  margin-right: -0.1rem;
`

const BackButton = ({ color, onClick }: { color?: string; onClick?: () => void }) => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" onClick={onClick}>
    <path
      d="M11.3562 22.7334L13.3621 20.7275L5.43994 12.7943H22.712V9.94946H5.43994L13.3621 2.01622L11.3562 0.0103304L0 11.3776L11.3562 22.7334Z"
      fill={color ?? "black"}
    />
  </svg>
)

const Bookmark = ({ color, onClick }: { color?: string; onClick: () => void }) => (
  <svg width="20" height="27" viewBox="0 0 22 29" fill="none" onClick={onClick}>
    <path
      d="M18.2377 0.822162H3.03784C1.36028 0.822162 0.0225812 2.18244 0.0225812 3.86L0 28.1733L10.6433 23.6166L21.2755 28.1733V3.86C21.2755 2.18244 19.9152 0.822162 18.2377 0.822162V0.822162ZM18.2377 23.6166L10.6433 20.3069L3.03784 23.6166V3.86H18.2377V23.6166Z"
      fill={color ? color : "black"}
    />
  </svg>
)

export const DishBookmark = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <Bookmark color={enabled ? "#f52828" : "black"} onClick={onToggle} />
)

export const DishCounter = ({
  value,
  onIncrease,
  onDecrease,
}: {
  value: number
  onIncrease: () => void
  onDecrease: () => void
}) => (
  <StyledCounter cantDecrease={value === 1}>
    <div onClick={onIncrease}>+</div>
    <span>{value}</span>
    <div onClick={() => value > 1 && onDecrease()}>--</div>
  </StyledCounter>
)

export const DishFooter = ({
  price,
  currency,
  onAdd,
}: {
  price: number
  currency: string
  onAdd: () => void
}) => (
  <>
    <span>
      {Number(price).toFixed(2)}
      {currencies[currency] ?? "$"}
    </span>
    <Button onClick={onAdd}>Add to card</Button>
  </>
)

export const Dish = ({
  open,
  restaurantName,
  noGalleryBullets,
  measurement,
  name,
  description,
  spicyLevel,
  labels,
  ingredients,
  onClose,
  bookmark,
  gallery,
  counter,
  footer,
}: {
  open: boolean
  restaurantName: string
  noGalleryBullets: boolean
  measurement?: string
  name?: string
  description?: string
  spicyLevel?: number
  labels?: string[]
  ingredients?: string
  onClose: () => void
  bookmark: ReactNode
  gallery: ReactNode
  counter: ReactNode
  footer: ReactNode
}) => (
  <StyledContainer id={"dish"} open={open}>
    <StyledHeader>
      <BackButton onClick={onClose} />
      <h2>Restaurant {restaurantName}</h2>
      {bookmark}
    </StyledHeader>

    <StyledGallery>{gallery}</StyledGallery>

    <StyledContent noGalleryBullets={noGalleryBullets}>
      <div>
        <StyledInfo>
          <span>{measurement}</span>
          <h2>{name}</h2>
          <p>{description}</p>
        </StyledInfo>
        {counter}
      </div>
      <StyledIngredients>
        {/*Spicy level*/}
        {(spicyLevel ?? 0) > 0 && (
          <div>
            <h4>Spicy level:</h4>
            <p>
              {fillByIndex(
                (v) => (
                  <StyledChilli key={v} />
                ),
                spicyLevel ?? 0
              )}
            </p>
          </div>
        )}

        {/*Labels*/}
        <div>
          <h4>Consist of:</h4>
          <p>
            <DishLabels labels={labels ?? []} />
          </p>
        </div>

        {/*Ingredients*/}
        <div>
          <span>
            <h4>Ingredients: </h4>
            <span>{ingredients}</span>
          </span>
        </div>
      </StyledIngredients>
    </StyledContent>

    <StyledFooter>{footer}</StyledFooter>
  </StyledContainer>
)
