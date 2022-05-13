const BackIcon = ({ isGray }: { isGray: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.66021 9.6977C7.51111 9.87165 7.51111 10.1283 7.66021 10.3023L13.1628 16.722C13.441 17.0466 13.4034 17.5353 13.0788 17.8136C12.7542 18.0919 12.2654 18.0543 11.9872 17.7296L6.48459 11.31C5.83847 10.5562 5.83847 9.44383 6.48459 8.69002L11.9872 2.27037C12.2654 1.94573 12.7542 1.90814 13.0788 2.1864C13.4034 2.46466 13.441 2.95341 13.1628 3.27805L7.66021 9.6977Z"
        fill={isGray ? "#A0A1A5" : "white"}
      />
    </svg>
  );
};

export default BackIcon;
