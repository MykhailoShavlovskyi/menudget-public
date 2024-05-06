import styled from "styled-components"
import React from "react"
import Image from "next/image"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;

  img {
    margin-top: 1.5rem;
    margin-bottom: 3rem;
  }

  & > svg {
    width: 100%;
    margin-left: -5px;
  }

  div {
    width: 100%;
    display: block;
    padding: 1.25rem 4rem 1.2rem 2.5rem;
    font-family: Avenir;

    h1 {
      margin: 0;
      font-weight: bolder;
      letter-spacing: 0.05px;
    }

    p {
      margin: -0rem 0 0;
      color: #b2b2b2;
      font-size: 0.95rem;
      letter-spacing: 0.2px;
      line-height: 1rem;
    }

    ul {
      margin-top: 1.75rem;
      padding: 0 0 0 0.2rem;

      li {
        font-size: 0.95rem;
        color: #ffbd02;
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        letter-spacing: 0.38px;

        svg {
          width: 1.1rem !important;
          margin-right: 0.9rem !important;
        }
      }
    }

    p:last-child {
      margin-top: 2.37rem;
      font-size: 0.65rem;
      width: 10.5rem;
      line-height: 0.65rem;
      letter-spacing: 0.1px;
    }
  }
`

const Map = () => (
  <svg
    width={(515 / 515) * 395}
    height={(288 / 515) * 395}
    viewBox="0 0 515 288"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M510.088 12.3007H10.0879V276.381H510.088V12.3007Z"
      fill="#F2F2F2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M102.649 120.247L146.142 75.274L80.8086 7.72736L87.4888 0.820587L198.155 115.234L308.542 1.11407L315.222 8.0206L310.289 13.1273L358.062 98.674L510.089 7.94064L514.809 16.394L362.796 107.141L389.702 155.314L435.209 108.261H509.596V118.021H439.129L394.582 164.074L406.609 185.594L452.742 172.821L452.782 172.967L453.315 172.821L465.409 219.474L512.449 206.447L514.889 215.887L467.849 228.914L467.875 228.981L458.742 231.514L458.729 231.447L458.475 231.514L456.036 222.074L456.275 222.007L446.596 184.634L411.502 194.354L460.929 282.874L452.742 287.754L387.675 171.221L279.675 282.874L272.996 275.967L306.636 241.194L198.155 129.047L46.0357 286.327L39.3419 279.421L96.6888 220.127L58.0487 180.181L7.58203 232.341L0.902344 225.434L75.0357 148.807H9.59557V139.034H84.1419V139.381L94.9419 128.221L62.4086 2.72736L71.5419 0.207306L102.649 120.247ZM253.449 172.394L313.315 234.287L382.782 162.474L354.609 112.021L253.449 172.394ZM64.7289 173.274L103.369 213.221L191.475 122.141L152.836 82.1807L64.7289 173.274ZM204.836 122.141L246.542 165.247L349.889 103.567L303.369 20.274L204.836 122.141Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M268.955 166.887C268.955 166.887 284.448 143.501 284.448 133.474C284.448 124.928 277.502 117.981 268.955 117.981C260.395 117.981 253.448 124.928 253.448 133.474C253.448 143.501 268.955 166.887 268.955 166.887Z"
      fill="#FFC101"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M268.955 126.194C272.169 126.194 274.795 128.807 274.795 132.02C274.795 135.247 272.169 137.861 268.955 137.861C265.729 137.861 263.115 135.247 263.115 132.02C263.115 128.807 265.729 126.194 268.955 126.194Z"
      fill="white"
    />
  </svg>
)

const Mail = () => (
  <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.380859 0.6745H21.9982V16.8874H0.380859V0.6745Z" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0_120_6290" transform="scale(0.0204082 0.027027)" />
      </pattern>
      <image
        id="image0_120_6290"
        width="49"
        height="37"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAlCAYAAADr2wGRAAAABHNCSVQICAgIfAhkiAAAAtBJREFUWIXtmE1PE1EUhp92SkvQAi3QQqAipUZNWOgOFyRo1MSwcEFCQoz6D2QjhqhoETB+bVy5dKERoyFxoTGRBD9CwoKFP8DyYdTQFiiFstDSZlzcNsPYFkuZKW3SZ9e3595z3nNu52ZqkH8+kfnxGOIbFB3SfnD1YZCnj8rEI3tdTu5IVoxFbQAgHsG41zVoQXoTlgNQcQQw5LeajBig4jCYnWm/NaUo5c1wfBKMZlibBl8//P6ud5WZKW+GQ4+gsh1iYfh6BqJ+VUjqJMwOYQCg6gQc+wD1l8j/VAzQcFnkr2wXkqkayl0pkakm1mdg8anyWaqA1lFoGwNLk14Vq7G4oO0luEdEfgBkUdf6TEq4QZ5qktNuVN0BnodgaVS0+AYsjIL/uQ6VAxig/gIcvAnSPkX+8wt8VyE8lX5VRhMAkhVaBsHZq9bDX8B3TWyuFZZG0bTqDrXufwELI2x3FWxvIomtEzwPwNygaPEIzA9DYCzHqrfg7BXNkqyKFl2Eb/0Q/vzf5dmZgMRUvODsUeurn8RUoovZF53E3CCaY+tU64FXMO/dtvtbyd5EEtupxFS2PLPjEZi7DcHX2e/j6AG395/uB8QjffXjjkrauQkAUxW0DIGjW62vTiamEsi81uwUZ992Uq0Hx2HuFsTXd1xObiaS2M+C5x6U1SlabE1MZWk8Nb6uG9x3wFSpaNEgzA5AaCLnMnZnAsBkA/cw1J1X66EJ8A3AZhDKHOC5D/bT6pilNzA3KG7iXbB7E0lqzkHrXSirVbRYGPzPoP6iuG2TbC7D7HVYea9Jau1MAJjswkhtV+aY5bcwewNiIc3SamsiSU1XYip2RdsMJbr/TvN0+pgAcaxavOJ3EJqA+SFxjHRAPxNKCkDfFHl4s9O5R+TFhP6UTBQKJROFQslEoVAyUSiUTBQKJROFglH1l0kxIlkx4rpC0RqRrODq4y9opdBSI5SoJQAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
)

const Phone = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.474609 0.502197H20.0481V20.0871H0.474609V0.502197Z" fill="url(#pattern1)" />
    <defs>
      <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0_2_6762" transform="scale(0.0222222)" />
      </pattern>
      <image
        id="image0_2_6762"
        width="45"
        height="45"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAABHNCSVQICAgIfAhkiAAAA1pJREFUWIXN2UtoE0Ecx/HvbkxqtUp9JPEBPpseJKWC4kEE9aI331UvguilVxE9FARPChZFvXgTvYhP1IMHvQg+QCgoYn2ANtaImkbU2lKSppr1sJkmMbvdmewm2x+UwjLzz6fDv7OzG80wDAOrjH2Hb5chfROaVsKCAzBzjeXQekezRGeT0LsbRr+UDoWWUxDdWz+dTfSKK5ZgAAM+HIWBq/WRTZBytC1YZHLAi+jsJwewiP9wE539BL17JMAiAn6tdrIJoquDRQz4cMQXuGb0rDUYTbopAS3dEN3jGcopOvmsyxKFFR965glIJjoNUQ/KGPD1ogd15KIT8gINDPV4U0ciOqF53lQKb/emjkR0ghH3VYJhWHDQfR3JuG+PYBji16BhoTciieg0uGgPAZ4W804kEZ3pcUBTn+kTGEAnFIGmdrVZPoJBnD3mbJaf4TMYBHq2JHoSgEGgp8WgcZnzaC0A2pQak5xTPE/P3uQ8Opcyz9yZjzUkOaeIlu3rSQAvomesgukr5Gb5DC95RtRgSZf8zFwKejt8gZc/2Davh+Z18rNzA77AK18hLO5C6Q7pA7wS3dQG4a1qVdzAcynoPwk9q+Fdp9S53P4N0/MNYIypAUJRiN+AxqVy4zMJ8x86N1ByUYfYaYjssp1WudIAUxfBwk4FbSHjK55wHmsJBsjD+8OQvmU71XqlAYw8vN0Pvx7Ko0VCUYhft7/L2oJLo0PsDER2KqAB/g7Dy62Qea+oxh4uBRbRofVsxaOcdXuIBGbAioswpVlRTKFVdpe3SiYBrzokwWC2yiH4fqfs6sQrLTL4BN7sA+OPgroQseJggsfS6jW0AMTOje9qcmiAb5cgcUz9A8GEG0Z1YBEtAK3nYe4WBTSY3wx8PF7dinsRLQBttxXRAL+fmjeBP4M1kjkkvK0KNEC2H94cqG5XcZvQfIfdwy5Tl0D7XZi10VuQTCI7qlxpESMPydPw5YL6Lb+aBCOw8p5LtEj2MyS7C/up+3KWCUag7To0LvcILTLSC/0nYPCxZyWBMjCo7NMqGXxk4kdeu6/1HxhqhQbAgOHn8OMB/LwPmT71EhZgqCn6v2T64Md98w8YfoFj79uAoZ7o0uTSZuvkBgo/qcLvdOEwpUP8iiUY4B+ypWSzW/vwwwAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
)

const Globe = () => (
  <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.421875 0.0167847H22.0392V21.6341H0.421875V0.0167847Z" fill="url(#pattern2)" />
    <defs>
      <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use href="#image0_120_6289" transform="scale(0.0204082)" />
      </pattern>
      <image
        id="image0_120_6289"
        width="49"
        height="49"
        href="data:image/png;base64,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"
      />
    </defs>
  </svg>
)

export const Contact = () => (
  <>
    <StyledContainer>
      <Image src={"/logo2.png"} alt={"logo"} width={634 * 0.39} height={125 * 0.39} />
      <Map />
      <div>
        <h1>Contact us!</h1>
        <p>If you have any proposes, please send us a message on</p>
        <ul>
          <a href="mailto:menudget@gmail.com">
            <li>
              <Mail />
              menudget@gmail.com
            </li>
          </a>
          <li>
            <Phone />
            12365721376253
          </li>
          <a href="https://menudget.com">
            <li>
              <Globe />
              www.menudget.com
            </li>
          </a>
        </ul>
        <p>The best mexican food restraurant in Dubai via TriAdvisor 2020</p>
      </div>
    </StyledContainer>
  </>
)
