import styled from "styled-components"
import React, { MouseEvent } from "react"
import Image from "next/image"

const StyledContainer = styled.div`
  margin-bottom: 0.1rem;
  height: 5rem;
  min-height: 2rem;
  width: 100%;
  font-family: Avenir;
  padding: 0 0.22rem 0 0;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  // Count
  span {
    font-weight: bold;
    margin-right: 1rem;
  }

  // Name and price
  & > div {
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 1rem;
      margin: 0;
      margin-bottom: -0.15rem;
      letter-spacing: 0.1px;
    }

    span {
      margin: 0;
      font-weight: normal;
      color: #b2b2b2;
    }
  }

  // Trash button
  svg {
    position: absolute;
    right: 0.26rem;
  }
`

const StyledPlaceholder = styled(Image)`
  border-radius: 0.5rem;
  opacity: 0.5;
  margin-right: 1rem;
  cursor: pointer;
`

const StyledImageContainer = styled.div`
  margin-right: 0.5rem;
  position: relative;
  width: 5rem !important;
  height: 5rem;
  cursor: pointer;
  margin-left: -0.5rem;
`

const RemoveButton = ({
  disabled,
  onClick,
}: {
  disabled?: boolean
  onClick: (e: MouseEvent) => void
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 26 26"
    fill="none"
    onClick={(e) => {
      e.stopPropagation()
      !disabled && onClick(e)
    }}
    style={{ cursor: disabled ? "not-allowed" : "pointer" }}
  >
    <path
      d="M3.35523 6.71V24.5848C3.35523 25.1969 3.85404 25.6955 4.46611 25.6955H21.2298C21.8419 25.6955 22.3407 25.1969 22.3407 24.5848V6.71H3.35523ZM8.93177 20.6744C8.93177 20.9804 8.69392 21.2298 8.37655 21.2298C8.07052 21.2298 7.82089 20.9804 7.82089 20.6744V11.7313C7.82089 11.4253 8.07052 11.1759 8.37655 11.1759C8.69392 11.1759 8.93177 11.4253 8.93177 11.7313V20.6744ZM13.4089 20.6744C13.4089 20.9804 13.1598 21.2298 12.8537 21.2298C12.5364 21.2298 12.287 20.9804 12.287 20.6744V11.7313C12.287 11.4253 12.5364 11.1759 12.8537 11.1759C13.1598 11.1759 13.4089 11.4253 13.4089 11.7313V20.6744ZM17.8746 20.6744C17.8746 20.9804 17.6254 21.2298 17.3194 21.2298C17.0134 21.2298 16.7642 20.9804 16.7642 20.6744V11.7313C16.7642 11.4253 17.0134 11.1759 17.3194 11.1759C17.6254 11.1759 17.8746 11.4253 17.8746 11.7313V20.6744ZM25.1403 4.47717H17.8746V0.566727C17.8746 0.249357 17.6254 -3.8147e-06 17.3194 -3.8147e-06H8.37655C8.07052 -3.8147e-06 7.82089 0.249357 7.82089 0.566727V4.47717H0.555662C0.249627 4.47717 0 4.72658 0 5.03261C0 5.33865 0.249627 5.58805 0.555662 5.58805H25.1403C25.4463 5.58805 25.6955 5.33865 25.6955 5.03261C25.6955 4.72658 25.4463 4.47717 25.1403 4.47717ZM16.7642 4.47717H8.93177V1.12217H16.7642V4.47717Z"
      fill={disabled ? "#E3E3E3" : "#FFBD02"}
    />
  </svg>
)

export const DishEntry = ({
  count,
  thumbnailUrl,
  name,
  price,
  deleteDisabled,
  onClick,
  onDelete,
}: {
  count?: number
  thumbnailUrl?: string
  name: string
  price: number
  deleteDisabled?: boolean
  onClick: () => void
  onDelete: () => void
}) => (
  <StyledContainer onClick={onClick}>
    {count != null && <span>{count}x</span>}
    {thumbnailUrl ? (
      <StyledImageContainer>
        <Image
          src={thumbnailUrl}
          alt={`${name}-thumbnail`}
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </StyledImageContainer>
    ) : (
      <StyledPlaceholder src={"/placeholder.png"} alt={"placeholder"} width={64} height={64} />
    )}
    <div>
      <h3>{name}</h3>
      <span>{price}$</span>
    </div>
    <RemoveButton disabled={deleteDisabled} onClick={onDelete} />
  </StyledContainer>
)

export const StyledSplitter = styled.div`
  height: 1.3px;
  width: 100%;
  background-color: #eeeeee;
`
