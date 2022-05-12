// 헤더 상단 arrow
const Arrow = ({ isWhite = false }: { isWhite: boolean }) => {
  return (
    <svg
      width="8"
      height="16"
      viewBox="0 0 8 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66021 7.6977C1.51111 7.87165 1.51111 8.12835 1.66021 8.3023L7.16278 14.722C7.44104 15.0466 7.40344 15.5353 7.0788 15.8136C6.75416 16.0919 6.26542 16.0543 5.98715 15.7296L0.484593 9.30998C-0.16153 8.55617 -0.161529 7.44383 0.484594 6.69002L5.98716 0.27037C6.26542 -0.054269 6.75416 -0.0918647 7.0788 0.186398C7.40344 0.46466 7.44104 0.953406 7.16278 1.27805L1.66021 7.6977Z"
        fill={isWhite ? "white" : "#A0A1A5"}
      />
    </svg>
  );
};

export default Arrow;
