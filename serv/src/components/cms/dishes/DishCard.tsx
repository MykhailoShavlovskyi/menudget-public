import { useDrag } from "react-dnd"
import React from "react"
import styled, { css } from "styled-components"
import { StyledCard } from "../common/card/Card"
import Image from "next/image"
import { ContextMenu, ContextMenuItem } from "../common/ContextMenu"
import { PencilIcon } from "../icons/PencilIcon"
import { TrashIcon } from "../icons/TrashIcon"
import { ChefIcon } from "../icons/ChefIcon"
import { LeafIcon } from "../icons/LeafIcon"
import { currencies } from "../../../lib/currencies"
import { CardProps } from "../common/card/Card"
import { DiscountIcon } from "../icons/DiscountIcon"
import { StarIcon } from "../icons/StarIcon"
import { ChefIcon2 } from "../icons/ChefIcon2"

const StyledDishCard = styled(StyledCard)`
  display: flex;
  flex-direction: column;
  padding: 1.5625rem;
  align-items: center;

  ${(v) =>
    v.selected &&
    css`
      padding: calc(1.5625rem - 0.25rem);
    `}
  & > div {
    display: flex;
    width: 100%;
    justify-content: space-between;

    div:first-child {
      display: flex;
      gap: 0.625rem;

      button {
        display: flex;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0.3125rem;
        justify-content: center;
        align-items: center;
      }
    }

    div:nth-child(2) {
      button {
        display: flex;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0.3125rem;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .img-container {
    margin: 0.5rem 0;
    width: 9.25rem;
    height: 9.25rem;
    position: relative;

    img {
      border-radius: 0.5rem;
    }
  }

  h2 {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.875rem;
  }

  p {
    margin: 0.625rem 0 0.5rem;
    color: #b6b6b6;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.375rem;
    max-height: 3.75rem;
    text-align: center;
  }

  .measure {
    margin-bottom: 0.625rem;
    color: #b6b6b6;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.375rem;
    text-align: center;
  }

  .price {
    flex: 1;
    display: flex;
    align-items: flex-end;
    font-size: 1.375rem;
    font-weight: 700;
    line-height: 1.875rem;
  }

  .sheff,
  .leaf,
  .discount,
  .star,
  .chef {
    display: flex;
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.3125rem;
    justify-content: center;
    align-items: center;
    border-radius: 0.625rem;

    svg {
      transform: scale(0.9);
    }
  }

  .sheff {
    background: #fff2dd;
  }

  .leaf {
    background: #e5f7e6;
  }

  .discount {
    background: #ffe8e8;
  }

  .star {
    background: #fff5dc;
  }

  .chef {
    background: #ffefdd;
  }
`

export const DishCard = ({
  id,
  imageUrl,
  name,
  description,
  measurement,
  price,
  featured,
  topOfTheWeek,
  currency,
  sticker,
  selected,
  onClick,
  onDelete,
}: CardProps & {
  imageUrl?: string
  name: string
  description: string
  measurement: string
  price: number
  featured: boolean
  topOfTheWeek: boolean
  currency: string
  sticker: string | null
  onDelete: () => void
}) => {
  const [collected, drag, dragPreview] = useDrag<
    unknown,
    unknown,
    {
      isDragging: boolean
    }
  >(() => ({
    type: "dish",
    item: { id },
  }))

  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <StyledDishCard
      //ref={drag}
      id={name}
      onClick={onClick}
      selected={selected}
      {...collected}
    >
      <div>
        <div>
          {/*  {featured && (
            <div className={"sheff"}>
              <ChefIcon />
            </div>
          )}
          {topOfTheWeek && (
            <div className={"leaf"}>
              <LeafIcon />
            </div>
          )}*/}
          {sticker === "Discount" && (
            <div className={"discount"}>
              <DiscountIcon />
            </div>
          )}
          {sticker === "Star" && (
            <div className={"star"}>
              <StarIcon />
            </div>
          )}
          {sticker === "Chef" && (
            <div className={"chef"}>
              <ChefIcon2 />
            </div>
          )}
        </div>
        <ContextMenu
          firstGroup={
            <>
              <ContextMenuItem
                label={"  Edit dish"}
                overColor={"black"}
                Icon={PencilIcon}
                onClick={onClick}
              />
            </>
          }
          secondGroup={
            <ContextMenuItem
              label={"  Delete order"}
              overColor={"#FF0000"}
              Icon={TrashIcon}
              onClick={onDelete}
            />
          }
        />
      </div>

      <div className={"img-container"}>
        <Image
          alt={"dish"}
          src={imageUrl ?? "/placeholder.png"}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>

      <h2>{name}</h2>
      <p>{description},</p>
      <span className={"measure"}>{measurement}</span>
      <span className={"price"}>
        {currencies[currency] ?? "$"}
        {price}
      </span>
    </StyledDishCard>
  )
}
