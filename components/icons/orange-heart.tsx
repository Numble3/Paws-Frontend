interface Props {
  isWhiteFill: boolean;
}

const OrangeHeart = ({ isWhiteFill }: Props) => {
  return isWhiteFill ? (
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.71568 0.0336516C3.90052 -0.137512 5.18984 0.346138 6 1.44192C6.81017 0.346138 8.09948 -0.137512 9.28432 0.0336516C10.0065 0.137975 10.6925 0.486463 11.1966 1.08723C11.7021 1.6896 12 2.51572 12 3.53407C12 5.60356 10.4705 7.41837 9.08096 8.65658C8.37062 9.28958 7.66255 9.80203 7.13313 10.1559C6.86795 10.3331 6.64639 10.4713 6.49021 10.5658C6.41209 10.613 6.35024 10.6493 6.30738 10.6742L6.25763 10.7027L6.24404 10.7104L6.24018 10.7126L6.239 10.7132L6.23832 10.7136L6 10.2857C5.76168 10.7136 5.76115 10.7133 5.761 10.7132L5.75982 10.7126L5.75596 10.7104L5.74238 10.7027L5.69262 10.6742C5.64976 10.6493 5.58791 10.613 5.50979 10.5658C5.35361 10.4713 5.13206 10.3331 4.86687 10.1559C4.33745 9.80203 3.62938 9.28958 2.91904 8.65658C1.52954 7.41837 0 5.60356 0 3.53407C0 2.51572 0.29792 1.6896 0.803366 1.08723C1.30747 0.486463 1.99353 0.137975 2.71568 0.0336516ZM6 10.2857C6.23832 10.7136 6.23817 10.7137 6.23832 10.7136C6.09016 10.7961 5.90985 10.7961 5.76168 10.7136L6 10.2857Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1.44192C5.18984 0.346138 3.90052 -0.137512 2.71568 0.0336516C1.99353 0.137975 1.30747 0.486463 0.803366 1.08723C0.29792 1.6896 0 2.51572 0 3.53407C0 5.60356 1.52954 7.41837 2.91904 8.65658C3.62938 9.28958 4.33745 9.80203 4.86687 10.1559C5.13206 10.3331 5.35361 10.4713 5.50979 10.5658C5.58791 10.613 5.64976 10.6493 5.69262 10.6742C5.71406 10.6866 5.73076 10.6961 5.74238 10.7027L5.75596 10.7104L5.75982 10.7126L5.761 10.7132C5.76115 10.7133 5.76168 10.7136 6 10.2857L5.76168 10.7136C5.90985 10.7961 6.09016 10.7961 6.23832 10.7136L6 10.2857C6.23832 10.7136 6.23817 10.7137 6.23832 10.7136L6.239 10.7132L6.24018 10.7126L6.24404 10.7104L6.25763 10.7027C6.26925 10.6961 6.28594 10.6866 6.30738 10.6742C6.35024 10.6493 6.41209 10.613 6.49021 10.5658C6.64639 10.4713 6.86795 10.3331 7.13313 10.1559C7.66255 9.80203 8.37062 9.28958 9.08096 8.65658C10.4705 7.41837 12 5.60356 12 3.53407C12 2.51572 11.7021 1.6896 11.1966 1.08723C10.6925 0.486463 10.0065 0.137975 9.28432 0.0336516C8.09948 -0.137512 6.81017 0.346138 6 1.44192ZM6 9.71742C5.85572 9.62987 5.65312 9.50311 5.41119 9.34142C4.90745 9.00475 4.23797 8.5198 3.57076 7.92524C2.20515 6.70832 0.979592 5.14731 0.979592 3.53407C0.979592 2.71106 1.21739 2.1178 1.55378 1.7169C1.89151 1.31441 2.3534 1.07575 2.85574 1.00318C3.86483 0.857405 5.02574 1.38557 5.54922 2.6174C5.62607 2.79822 5.80353 2.91563 6 2.91563C6.19648 2.91563 6.37394 2.79822 6.45078 2.6174C6.97427 1.38557 8.13517 0.857405 9.14426 1.00318C9.6466 1.07575 10.1085 1.31441 10.4462 1.7169C10.7826 2.1178 11.0204 2.71106 11.0204 3.53407C11.0204 5.14731 9.79485 6.70832 8.42924 7.92524C7.76203 8.5198 7.09256 9.00475 6.58881 9.34142C6.34688 9.50311 6.14428 9.62987 6 9.71742Z"
        fill="#ECA354"
      />
    </svg>
  );
};

export default OrangeHeart;
