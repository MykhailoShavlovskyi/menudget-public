import styled from "styled-components"
import Image from "next/image"
import React, { ReactNode, useMemo } from "react"
import { fillByIndex } from "../../../lib/fillByIndex"
import { Chilli } from "../common/Chilli"
import { NoContent } from "../common/NoContent"
import { Sticker } from "../../../definitions/Sticker"
import { DiscountIcon } from "../../cms/icons/DiscountIcon"
import { StarIcon } from "../../cms/icons/StarIcon"
import { ChefIcon2 } from "../../cms/icons/ChefIcon2"
import { currencies } from "../../../lib/currencies"

const StyledContainer = styled.div`
  padding: 0.4rem 0 2rem 1.8rem;
  position: relative;

  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > div {
    display: inline-block;
    flex: 0 0 auto;
  }
`

const StyledPlaceholder = styled.div`
  width: 100%;
  padding: 0 1.8rem;
`

const StyledCard = styled.div`
  width: 11.45rem;
  height: 15.3rem;
  background-color: white;
  margin-right: 1.35rem;
  margin-bottom: 2.6rem;

  cursor: pointer;
  box-shadow: 0 0 8px #dddddd;
  border-radius: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  & > div:first-child {
    position: absolute;
    top: 0.73rem;
    left: 1.21rem;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    span:first-child {
      font-weight: normal;
      color: #b2b2b2;
      font-size: 0.77rem;
      font-family: Avenir;
    }
  }

  h4 {
    margin: 0;
    margin-top: 0.5rem;

    padding: 0 1.2rem 0 1.4rem;
    width: 100%;
    font-family: Avenir;
    font-weight: bolder;
    font-size: 1.05rem;
    letter-spacing: -0.2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }

  p {
    margin-top: 0.4rem;
    text-align: center;
    overflow-wrap: break-word;
    white-space: normal;
    color: #b2b2b2;
    font-family: Avenir;
    font-weight: normal;
    font-size: 11px;
    padding: 0 1.2rem;
    line-height: 0.75rem;
    //letter-spacing: 0.25px;
    max-height: 3rem;
    overflow: hidden;

    /* text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 3rem;
    display: block;*/
  }

  button {
    position: absolute;
    bottom: -1.125rem;
    width: 4.5rem;
    height: 2.25rem;
    border-radius: 10rem;
    background-color: black;
    border: none;
    color: white;
    font-family: Avenir;
    font-weight: bold;
    font-size: 1.4rem;
    cursor: pointer;

    :active {
      opacity: 0.75;
    }
  }

  .price {
    font-weight: bold;
    font-family: Avenir;
  }
  .price-spicy {
    position: absolute;
    bottom: 2.2rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 0 0 2.2rem;
    height: 1rem;
  }
`

const StyledDiscountIcon = styled(DiscountIcon)`
  transform: scale(0.5) translateX(24px) translateY(-16px);
`
const StyledStarIcon = styled(StarIcon)`
  transform: scale(0.5) translateX(24px) translateY(-16px);
`
const StyledChefIcon = styled(ChefIcon2)`
  transform: scale(0.5) translateX(24px) translateY(-16px);
`

const StyledThumbnailContainer = styled.div`
  margin-top: 2.35rem;
  position: relative;
  width: 8rem !important;
  height: 4rem !important;

  img {
    width: 4rem !important;
    height: 4rem !important;
  }
`

const StyledPlaceholderContainer = styled(StyledThumbnailContainer)`
  display: flex;
  justify-content: center;
  background-color: #cccccc;
  border-radius: 0.35rem;
  opacity: 0.5;
`

const StyledChilliContainer = styled.span`
  width: 50%;
  justify-content: center;
  display: flex;
  padding-right: 1rem;
`

function getTruncatedString(str: string, max = 95) {
  const tot = str.length
  str = tot <= max ? str : str.substring(0, max + 1) + "..."
  return str
}

export const DishCard = ({
  measurement,
  sticker,
  thumbnailUrl,
  name,
  description,
  price,
  currency,
  spicyLevel,
  onSelect,
  onAddToCart,
}: {
  measurement: string
  sticker?: string | null
  thumbnailUrl?: string
  name: string
  description: string
  price: number
  currency: string
  spicyLevel: number
  onSelect: () => void
  onAddToCart: () => void
}) => {
  const stickerIcon = useMemo(() => {
    switch (sticker) {
      case Sticker.Discount:
        return <StyledDiscountIcon />
      case Sticker.Star:
        return <StyledStarIcon />
      case Sticker.Chef:
        return <StyledChefIcon />
      default:
        break
    }
  }, [sticker])

  return (
    <StyledCard onClick={onSelect}>
      <div>
        <span>{measurement}</span>
        {stickerIcon}
      </div>

      {thumbnailUrl ? (
        <StyledThumbnailContainer>
          <Image src={thumbnailUrl} alt={"dish"} fill={true} style={{ objectFit: "contain" }} />
        </StyledThumbnailContainer>
      ) : (
        <StyledPlaceholderContainer>
          <Image src={"/placeholder.png"} alt={"placeholder"} width={64} height={64} />
        </StyledPlaceholderContainer>
      )}

      <h4>{name}</h4>
      <p>{getTruncatedString(description)}</p>

      {spicyLevel > 0 ? (
        <div className={"price-spicy price"}>
          <span>
            {price}
            {currencies[currency] ?? "$"}
          </span>
          <StyledChilliContainer>
            {fillByIndex(
              () => (
                <Chilli
                  style={{
                    transform: "scale(0.78)",
                    marginLeft: "-2px",
                    marginRight: "-1.75px",
                  }}
                />
              ),
              spicyLevel
            )}
          </StyledChilliContainer>
        </div>
      ) : (
        <span className={"price"}>
          {price}
          {currencies[currency] ?? "$"}
        </span>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation()
          onAddToCart()
        }}
      >
        +
      </button>
    </StyledCard>
  )
}

export const MenuDishes = ({ dishes }: { dishes: ReactNode[] }) => {
  const stacks = useMemo(() => {
    if (dishes.length == 2)
      return [<div key={`stack-${0}`}>{dishes[0]}</div>, <div key={`stack-${1}`}>{dishes[1]}</div>]

    const stacks: ReactNode[] = []
    for (let i = 0; i < dishes.length; i += 2) {
      const a = dishes[i]
      const b = dishes[i + 1]
      stacks.push(
        <div key={`stack-${i}`}>
          {a}
          {b}
        </div>
      )
    }

    return stacks
  }, [dishes])

  if (dishes.length === 0)
    return (
      <StyledPlaceholder>
        <NoContent label={"No dishes found"} />
      </StyledPlaceholder>
    )
  return (
    <>
      <StyledContainer>{stacks}</StyledContainer>
    </>
  )
}
