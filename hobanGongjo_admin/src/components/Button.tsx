import "./Button.css";
type Button = {
  text: string;
  onClick: () => void;
};
export const Button = ({ text, onClick }: Button) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
};
