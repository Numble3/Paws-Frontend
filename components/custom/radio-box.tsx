import styles from "styles/custom/radioBox.module.css";

interface Props {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const RadioBox = ({ isActive, text, onClick }: Props) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default RadioBox;
