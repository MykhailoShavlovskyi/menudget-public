import styled from "styled-components"
import React from "react"
import Image from "next/image"

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;

  & > div {
    width: 100%;

    // Banner
    :first-child {
      background-color: #e3e3e3;
      height: 11.9rem;
      width: 100%;
      position: relative;

      & > div {
        background-color: orange;
        width: 100%;
        height: 100%;
        background: linear-gradient(0.25turn, #ffc500, #ff8b01);
      }
    }

    // Logo + Info
    :last-child {
      font-family: Avenir;
      background-color: white;
      position: relative;
      padding: 0;
      min-height: 6rem;
      height: fit-content;
      display: flex;
      justify-content: flex-end;

      border-bottom: 1.5px solid #f4f4f4;
    }
  }
`

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  align-items: center;
  margin-left: 1.85rem;
  margin-top: -3.4rem;

  div {
    background-color: #e3e3e3;
    width: 6.75rem;
    height: 6.75rem;
    border-radius: 20rem;
    margin-bottom: 0.5rem;
    border: 9.5px solid white;

    img {
      position: absolute;
      border-radius: 20rem;
    }
  }

  span {
    color: #b2b2b2;
    font-size: 0.83rem;
  }
`

const StyledInfoContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.2rem 1rem 1rem;

  right: 0;

  h3 {
    text-align: start;
    font-size: 1.25rem;
    max-width: 13.5rem;
    letter-spacing: -0.3px;
    margin: 0 0 0.7rem;
    line-height: 1.3rem;
  }

  p {
    text-align: start;
    max-width: 13.5rem;
    margin: 0;
    color: #b2b2b2;
    font-size: 0.8rem;
    letter-spacing: 0.4px;
    line-height: 0.8rem;
  }
`

export const MenuHeader = ({
  bannerUrl,
  logoUrl,
  openTime,
  closeTime,
  name,
  description,
}: {
  bannerUrl: string | null
  logoUrl: string | null
  openTime: number
  closeTime: number
  name: string
  description: string
}) => {
  let openingMinutes: string | number = openTime % 1
  let openingHours: string | number = openTime - (openTime % 1)
  let closingMinutes: string | number = closeTime % 1
  let closingHours: string | number = closeTime - (closeTime % 1)
  if (openingMinutes < 10) openingMinutes = "0" + openingMinutes
  if (openingHours < 10) openingHours = "0" + openingHours
  if (closingMinutes < 10) closingMinutes = "0" + closingMinutes
  if (closingHours < 10) closingHours = "0" + closingHours
  const time = `${openingHours}:${openingMinutes}-${closingHours}:${closingMinutes}`

  return (
    <>
      <StyledHeader id={"header"}>
        <div>{bannerUrl ? <Image src={bannerUrl} alt={"banner"} fill={true} /> : <div />}</div>
        <div>
          <StyledLogoContainer>
            <div>
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={"logo"}
                  width={(6.75 - (9.5 * 2) / 16) * 16}
                  height={(6.75 - (9.5 * 2) / 16) * 16}
                />
              ) : (
                <Image
                  src={"/placeholder.png"}
                  alt={"logo"}
                  width={(6.75 - (9.5 * 2) / 16) * 16}
                  height={(6.75 - (9.5 * 2) / 16) * 16}
                  style={{ opacity: 0.5 }}
                />
              )}
            </div>
            <span>{time}</span>
          </StyledLogoContainer>
          <StyledInfoContainer>
            <h3>{name}</h3>
            <p>{description}</p>
          </StyledInfoContainer>
        </div>
      </StyledHeader>
    </>
  )
}
