export const RightArrowIcon = ({
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
      d="M18.3905 29.6095C17.8698 29.0888 17.8698 28.2446 18.3905 27.7239L24.1144 22L18.3905 16.2761C17.8698 15.7554 17.8698 14.9112 18.3905 14.3905C18.9112 13.8698 19.7554 13.8698 20.2761 14.3905L26.9428 21.0572C27.4635 21.5779 27.4635 22.4221 26.9428 22.9428L20.2761 29.6095C19.7554 30.1302 18.9112 30.1302 18.3905 29.6095Z"
      fill={color}
    />
  </svg>
)
