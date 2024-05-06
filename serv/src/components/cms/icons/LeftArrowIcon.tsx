export const LeftArrowIcon = ({
  color = "#161616",
  onClick,
}: {
  color?: string
  onClick?: () => void
}) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.9427 29.6095C27.4634 29.0888 27.4634 28.2446 26.9427 27.7239L21.2189 22L26.9427 16.2761C27.4634 15.7554 27.4634 14.9112 26.9427 14.3905C26.422 13.8698 25.5778 13.8698 25.0571 14.3905L18.3904 21.0572C17.8697 21.5779 17.8697 22.4221 18.3904 22.9428L25.0571 29.6095C25.5778 30.1302 26.422 30.1302 26.9427 29.6095Z"
      fill={color}
    />
  </svg>
)
