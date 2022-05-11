const EditIcon = ({width, height, isGrey}:{width:number, height:number, isGrey?:boolean}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4204 3.41301C22.3005 1.53 25.35 1.52885 27.2316 3.41043L31.5974 7.77623C33.4629 9.64176 33.4823 12.6618 31.6408 14.5512L15.4641 31.1486C14.228 32.4168 12.5326 33.132 10.7623 33.1319L5.94047 33.1317C3.69919 33.1316 1.9093 31.2633 2.00356 29.0223L2.21057 24.1008C2.27977 22.4556 2.96355 20.8963 4.12661 19.7314L20.4204 3.41301ZM25.3747 5.27014C24.5194 4.41488 23.1333 4.4154 22.2787 5.27131L19.3649 8.1895L26.8632 15.6878L29.7602 12.7155C30.5972 11.8567 30.5884 10.4839 29.7405 9.63594L25.3747 5.27014ZM5.98492 21.5898L17.508 10.0492L25.0288 17.57L13.5835 29.3129C12.8418 30.0738 11.8246 30.5029 10.7624 30.5029L5.94059 30.5027C5.1935 30.5026 4.59686 29.8799 4.62828 29.1329L4.83529 24.2114C4.87681 23.2242 5.28708 22.2886 5.98492 21.5898ZM32.6865 33.0035C33.4119 33.0035 34 32.415 34 31.689C34 30.963 33.4119 30.3744 32.6865 30.3744H21.9611C21.2356 30.3744 20.6475 30.963 20.6475 31.689C20.6475 32.415 21.2356 33.0035 21.9611 33.0035H32.6865Z"
        fill={isGrey? "#DADADA":"#ECA354"}
      />
    </svg>
  );
};

export default EditIcon;
