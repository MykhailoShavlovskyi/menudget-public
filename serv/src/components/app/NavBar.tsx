import styled from "styled-components"
import { useRouter } from "next/router"

const StyledContainer = styled.div`
  width: 100%;
  bottom: env(safe-area-inset-bottom);

  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    z-index: 1;
  }

  svg {
    cursor: pointer;
  }
`

const StyledPanel = styled.svg`
  filter: drop-shadow(0 0 8px #dddddd);
  //border-top: 2px solid black;
  width: 100%;
  position: absolute;
  margin-bottom: 2.6rem;
`

const StyledHomeBookContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  padding: 2rem 2rem 2rem 3rem;
  margin-bottom: 4.1rem;
`

const StyledReceiptBtn = styled.svg`
  position: absolute;
  bottom: -1.3rem;
  cursor: pointer;
`

const StyledQr = styled.svg`
  transform: scale(0.21);
  position: absolute;
  bottom: -1.8rem;
  margin-left: 0.4rem;
  cursor: pointer;
`

const StyledCart = styled.svg`
  position: absolute;
  margin-bottom: 9.1rem;
  cursor: pointer;
`

const StyledContactContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  margin-bottom: 4.1rem;
  margin-right: 0.3rem;
`

const Home = ({ color, ...rest }: { color?: string; onClick: () => void }) => (
  <svg width="27" height="26" viewBox="0 0 29 28" fill="none" {...rest}>
    <path
      d="M14.28 -8.5872e-06L8.16 5.56461V2.8787H4.48796V8.89666L0 12.9767L1.64333 14.79L3.26409 13.3167V26.1233C3.26409 26.8033 3.81929 27.3474 4.48796 27.3474H11.832V20.0033H16.728V27.3474H24.0608C24.7408 27.3474 25.2846 26.8033 25.2846 26.1233V13.3167L26.9167 14.79L28.56 12.9879L14.28 -8.5872e-06ZM16.728 15.1074H11.832V10.2113H16.728V15.1074Z"
      fill={color ? color : "black"}
    />
  </svg>
)

const Bookmark = ({ color, ...rest }: { color?: string; onClick: () => void }) => (
  <svg width="20" height="27" viewBox="0 0 22 29" fill="none" {...rest}>
    <path
      d="M18.2377 0.822162H3.03784C1.36028 0.822162 0.0225812 2.18244 0.0225812 3.86L0 28.1733L10.6433 23.6166L21.2755 28.1733V3.86C21.2755 2.18244 19.9152 0.822162 18.2377 0.822162V0.822162ZM18.2377 23.6166L10.6433 20.3069L3.03784 23.6166V3.86H18.2377V23.6166Z"
      fill={color ? color : "black"}
    />
  </svg>
)

const Cart = ({ color, ...rest }: { color?: string; onClick: () => void }) => (
  <StyledCart width="28" height="29" viewBox="0 0 28 29" fill="none" {...rest}>
    <path
      d="M11.9667 24.75C11.9667 25.9739 11.3095 27.1073 10.2556 27.7079C9.20172 28.3199 7.89839 28.3199 6.83316 27.7079C5.77927 27.1073 5.13334 25.9739 5.13334 24.75C5.13334 23.5375 5.77927 22.4043 6.83316 21.7924C7.89839 21.1805 9.20172 21.1805 10.2556 21.7924C11.3095 22.4043 11.9667 23.5375 11.9667 24.75ZM25.6333 24.75C25.6333 25.9739 24.9872 27.1073 23.9219 27.7079C22.868 28.3199 21.5651 28.3199 20.5112 27.7079C19.446 27.1073 18.7999 25.9739 18.7999 24.75C18.7999 23.5375 19.446 22.4043 20.5112 21.7924C21.5651 21.1805 22.868 21.1805 23.9219 21.7924C24.9872 22.4043 25.6333 23.5375 25.6333 24.75ZM25.6333 5.95016H7.69436L6.83316 2.18775C6.66318 1.33783 5.98325 0.827886 5.13334 0.827886H0V4.23882H3.76219L6.83316 18.2568C7.00315 19.1181 7.69436 19.628 8.54428 19.628H22.2221C22.902 19.628 23.582 19.1181 23.752 18.4268L27.1746 8.17122C27.5146 7.32131 27.0045 5.95016 25.6333 5.95016Z"
      fill={color ? color : "white"}
    />
  </StyledCart>
)

const Qr = ({ color }: { color?: string }) => {
  color = color ?? "white"
  return (
    <StyledQr fill="none" height="200px" width="200px" color={color}>
      <path
        clipRule="evenodd"
        d="M8.09 57.131h50.344V8.111H8.09v49.02z"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.296 37.227H28.227v-9.774h10.07v9.774z"
        fill={color}
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        clipRule="evenodd"
        d="M8.09 154.524h50.344V105.65H8.09v48.874z"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.296 134.974H28.227v-9.775h10.07v9.775z"
        fill={color}
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        clipRule="evenodd"
        d="M109.051 57.131h50.069V8.111h-50.069v49.02z"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M138.983 37.227h-10.068v-9.774h10.068v9.774z"
        fill={color}
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        d="M159.12 154.524h-45.309v-19.55H83.605v-9.775M103.743 110.537h35.24V81.214h20.137M13.124 71.439v9.775h30.207v9.774M93.674 12.79v19.55H78.57v48.874h35.24v9.774M138.983 110.537h20.137"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        d="M138.983 154.524v-14.662h10.069v-9.775M83.605 134.974v19.55M43.33 81.214H53.4M149.052 81.214v-9.775"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        clipRule="evenodd"
        d="M88.64 95.876H78.57V81.214h10.07v14.662z"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
      <path
        d="M88.64 57.131H78.57M149.052 139.862v14.662"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="square"
      />
    </StyledQr>
  )
}

const Profile = ({ color, ...rest }: { color?: string; onClick: () => void }) => (
  <svg width="27" height="26" viewBox="0 0 31 33" fill="none" {...rest}>
    <path
      d="M27.5807 22.8074C25.194 21.9407 21.2072 20.9006 15.8072 20.9006C10.4072 20.9006 6.42098 21.9407 4.03431 22.8074C2.04764 23.5141 0.727539 25.4208 0.727539 27.5274V31.9673C0.727539 32.5273 1.16754 32.9673 1.72754 32.9673H29.8874C30.4341 32.9673 30.8874 32.5273 30.8874 31.9673V27.5274C30.8874 25.4208 29.554 23.5141 27.5807 22.8074ZM15.8072 18.9006C20.2339 18.9006 23.8473 15.2875 23.8473 10.8475V8.84749C23.8473 4.4075 20.2339 0.794109 15.8072 0.794109C11.3672 0.794109 7.76764 4.4075 7.76764 8.84749V10.8475C7.76764 15.2875 11.3672 18.9006 15.8072 18.9006Z"
      fill={color ?? "black"}
    />
  </svg>
)

const ReceiptBtn = ({ onClick }: { onClick: () => void }) => (
  <StyledReceiptBtn xmlns="http://www.w3.org/2000/svg" width={129} height={131} onClick={onClick}>
    <defs>
      <linearGradient id="prefix__b" x1="0%" x2="70.473%" y1="0%" y2="70.947%">
        <stop offset="0%" stopColor="#FFCB00" />
        <stop offset="100%" stopColor="#FF9B06" />
      </linearGradient>
    </defs>
    <g filter="url(#prefix__a)">
      <path
        fillRule="evenodd"
        fill="url(#prefix__b)"
        d="M63.999.976c19.511 0 34.519 15.467 34.519 34.518 0 19.052-15.008 34.636-34.519 34.636-19.051 0-34.518-15.584-34.518-34.636C29.481 16.443 44.948.976 63.999.976z"
      />
    </g>
  </StyledReceiptBtn>
)

const Panel = () => (
  <StyledPanel viewBox="0 0 493 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M164.941 0.153839C176.874 0.153839 187.581 7.46045 191.928 18.5671C200.461 40.4604 223.021 58.0872 246.261 58.0872C269.515 58.0872 292.074 40.4604 300.608 18.5671C304.954 7.46045 315.661 0.153839 327.581 0.153839C365.008 0.153839 434.168 0.153839 434.168 0.153839C466.168 0.153839 492.102 26.0872 492.102 58.0872C492.102 96.1805 492.102 139.021 492.102 139.021H0.0078125C0.0078125 139.021 0.0078125 96.1805 0.0078125 58.0872C0.0078125 26.0872 25.9545 0.153839 57.9412 0.153839C57.9412 0.153839 127.421 0.153839 164.941 0.153839Z"
      fill="#F8F8F8FF"
    />
  </StyledPanel>
)
const a = "#f8f8f8"

export const NavBar = ({
  restaurantId,
  tableId,
  onOpenReceipt,
}: {
  restaurantId: number
  tableId?: number
  onOpenReceipt: () => void
}) => {
  const homeUrl = `/app/menu/${restaurantId}/${tableId}`
  const bookmarksUrl = `/app/bookmarks`
  const contactUrl = `/app/contact`

  const router = useRouter()
  const goTo = (url: string) => url !== window.location.pathname && router.push(url)
  const getColor = (url: string) => (router.asPath.includes(url) ? "#ffbd02" : "#E3E3E3")

  return (
    <StyledContainer>
      <Panel />
      <StyledHomeBookContainer>
        <Home color={getColor("/app/menu/")} onClick={() => goTo(homeUrl)} />
        <Bookmark color={getColor(bookmarksUrl)} onClick={() => goTo(bookmarksUrl)} />
      </StyledHomeBookContainer>

      <ReceiptBtn onClick={onOpenReceipt} />
      <Cart onClick={onOpenReceipt} />

      <StyledContactContainer>
        <Profile color={getColor(contactUrl)} onClick={() => goTo(contactUrl)} />
      </StyledContactContainer>
    </StyledContainer>
  )
}
