const CautionIcon = ({ width, height, fill }: { width:number, height:number,fill: string }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.16105 0.0830725C9.71487 -0.0276908 10.2851 -0.0276908 10.839 0.0830725C12.0696 0.329194 13.13 1.10328 13.7395 2.20033L19.4938 12.5581C19.8258 13.1557 20 13.828 20 14.5115C20 16.7329 18.1992 18.5338 15.9778 18.5338H4.02224C1.80082 18.5338 0 16.7329 0 14.5115C0 13.828 0.174205 13.1557 0.50617 12.5581L6.26051 2.20033C6.86998 1.10328 7.93044 0.329194 9.16105 0.0830725ZM10.5653 1.45132C10.1921 1.37669 9.80787 1.37669 9.4347 1.45132C8.60549 1.61717 7.89094 2.13876 7.48026 2.87797L1.72592 13.2358C1.50912 13.626 1.39535 14.0651 1.39535 14.5115C1.39535 15.9623 2.57145 17.1384 4.02224 17.1384H15.9778C17.4286 17.1384 18.6047 15.9623 18.6047 14.5115C18.6047 14.0651 18.4909 13.626 18.2741 13.2358L12.5197 2.87797C12.1091 2.13876 11.3945 1.61717 10.5653 1.45132Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 10.6268C9.61469 10.6268 9.30233 10.3144 9.30233 9.9291V6.20817C9.30233 5.82285 9.61469 5.51049 10 5.51049C10.3853 5.51049 10.6977 5.82285 10.6977 6.20817V9.9291C10.6977 10.3144 10.3853 10.6268 10 10.6268Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 13.8826C10.3853 13.8826 10.6977 13.5702 10.6977 13.1849V12.7198C10.6977 12.3345 10.3853 12.0221 10 12.0221C9.61469 12.0221 9.30233 12.3345 9.30233 12.7198V13.1849C9.30233 13.5702 9.61469 13.8826 10 13.8826Z"
        fill={fill}
      />
    </svg>
  );
};

export default CautionIcon;
