import { StyledCard } from "../common/card/Card"
import styled, { css } from "styled-components"
import { RestaurantPick } from "../../../db/restaurants/restaurants"
import Image from "next/image"
import { getTime } from "../../../lib/time"
import { getMsgMnFr, getMsgSatSun } from "../../../messages/restaurants"

const StyledRestaurantCard = styled(StyledCard)`
  display: flex;
  min-width: 18rem;
  flex-direction: column;
  align-items: flex-start;

  padding: 0.5rem 0 1.875rem 0.25rem;
  ${(v) =>
    v.selected &&
    css`
      padding: 0.25rem 0 calc(1.875rem - 0.25rem);
    `}

  .head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: -3.25rem;
    align-self: stretch;

    .banner {
      width: 100%;
      height: 8.125rem;
      background: #e0dfdf;
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        position: unset !important;
        height: unset !important;
      }
    }

    .placeholder {
      margin-top: -0.5rem;
      margin-left: -0.25rem;
      width: calc(100% + 0.25rem);
      background: ${(v) => v.theme.colors.gradient.orange};
    }

    .logo-container {
      margin-top: -3.5rem;
      display: flex;
      padding: 0.25rem 0 0.25rem 1.25rem;
      align-items: flex-end;
      gap: 0.625rem;
      align-self: stretch;
      z-index: 1;

      img {
        border-radius: 3.5rem;
        border: 6px solid white;
        background: white;
        box-sizing: content-box;
      }

      h4 {
        margin: 0 0 0.2rem;
        text-transform: uppercase;
      }
    }
  }

  .content {
    display: flex;
    padding: 0.625rem 2.5rem 0 2.25rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9375rem;
    align-self: stretch;

    p {
      margin: 0;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;

      font-size: 1rem;
      font-weight: 400;
      line-height: 1.25rem;
      text-overflow: ellipsis;
      color: ${(v) => v.theme.colors.secondary.grey};
    }

    span {
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 700;

      &:first-child {
        display: inline-block;
        width: 5rem;
      }
    }
  }
`

export const RestaurantCard = ({
  bannerUrl,
  logoUrl,
  name,
  description,
  openTimes,
  closeTimes,
  selected,
  onClick,
  onDoubleClick,
}: Omit<RestaurantPick, "bannerKey" | "logoKey"> & {
  bannerUrl?: string
  logoUrl?: string
  selected: boolean
  onClick: () => void
  onDoubleClick: () => void
}) => {
  const openTimeMnFr =
    (openTimes[0] + openTimes[1] + openTimes[2] + openTimes[3] + openTimes[4]) / 5
  const closeTimeMnFr =
    (openTimes[0] + openTimes[1] + openTimes[2] + openTimes[3] + openTimes[4]) / 5
  const openTimeSatSun = (openTimes[5] + openTimes[6]) / 2
  const closeTimeSatSun = (closeTimes[5] + closeTimes[6]) / 2

  return (
    <StyledRestaurantCard selected={selected} onClick={onClick} onDoubleClick={onDoubleClick}>
      <div className={"head"}>
        <div className={`banner ${bannerUrl ? "" : "placeholder"}`}>
          {bannerUrl && <Image alt={"banner"} src={bannerUrl} fill={true} sizes={"100%"} />}
        </div>

        <div className={"logo-container"}>
          <Image
            alt={"logo"}
            src={logoUrl ?? "/placeholder.png"}
            width={5.9 * 16}
            height={5.9 * 16}
          />
          <h4>{name}</h4>
        </div>
      </div>

      <div className={"content"}>
        <p>{description}</p>
        <div>
          <div>
            <span>{getMsgMnFr()}</span>
            <span>
              {getTime(openTimeMnFr)} - {getTime(closeTimeMnFr)}
            </span>
          </div>
          <div>
            <span>{getMsgSatSun()}</span>
            <span>
              {getTime(openTimeSatSun)} - {getTime(closeTimeSatSun)}
            </span>
          </div>
        </div>
      </div>
    </StyledRestaurantCard>
  )
}
