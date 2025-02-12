import "./Button.css";
type Button = {
  text: string;
  onClick: () => void;
  type?: string;
};
export const Button = ({ text, onClick, type }: Button) => {
  return (
    <button className={`button button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};
