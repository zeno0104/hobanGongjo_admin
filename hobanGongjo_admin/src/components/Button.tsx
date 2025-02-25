import { ButtonType } from "../utils/types";
import "./Button.css";

export const Button = ({ text, onClick, type }: ButtonType) => {
  return (
    <button className={`button button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};
