import styled, { css } from "styled-components"
import React from "react"

export const StyledContactForm = styled.div<{
  light?: boolean
}>`
  width: 100%;
  height: 50vh;
  gap: 4rem;
  display: flex;
  padding: 2rem 8rem;

  ${(v: any) =>
    v.light
      ? css`
          background-color: #f8f8f8;
        `
      : css`
          background-color: #eeeeee;
        `}
  div {
    h1 {
      margin-bottom: 0;
    }

    h2 {
      margin-bottom: 0.5rem;
      font-weight: normal;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-weight: normal;
    }

    display: flex;
    flex-direction: column;
    width: 50%;

    span {
      font-weight: lighter;
      font-size: 1.25rem;
      line-height: 1.75rem;
      margin-bottom: 0.5rem;

      :first-child {
        color: cornflowerblue;
      }
    }

    :last-child {
      margin-top: 5rem;

      .message {
        height: 8rem;
      }

      input {
        margin-bottom: 0.5rem;
        height: 2rem;
        text-align: center;

        border: none;
        border-radius: 0.5rem;
        box-shadow: 0 1px 4px 0 #d4c4c2;
      }

      button {
        height: 2rem;
      }

      div {
        input {
          :first-child {
            margin-right: 0.5rem;
          }

          flex: 1;
        }
      }
    }
  }
`

export const ContactForm = ({ light }: { light?: boolean }) => (
  <StyledContactForm light={light}>
    <div>
      <h1>Get in touch</h1>
      <h2>Menudget</h2>
      <span>Velveweg 174, 7533XL Enschede, Netherlands</span>
      <a href="mailto:menudget@gmail.com">
        <span style={{ fontSize: "1.2rem", color: "cornflowerblue" }}>menudget@gmail.com</span>
      </a>
      <span style={{ fontSize: "1rem" }}> +31 6 84 22 55 51</span>

      <h3>Want to work with us?</h3>
      <span>Send us an email with your CV and a link to some of your work if possible</span>
    </div>

    <div>
      <input placeholder={"Message Subject"} />
      <input className={"message"} placeholder={"What can we help you with?"} />
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <input placeholder={"Your name"} />
        <input placeholder={"Your company name"} />
      </div>
      <input placeholder={"Your email adress"} />
      <button>Send</button>
    </div>
  </StyledContactForm>
)
