import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  text: string;
};

export const Header = ({ text }: HeaderProps) => {
  const nav = useNavigate();
  const location = useLocation();
  const btnValue = location.pathname !== "/";
  return (
    <div className="Header">
      {btnValue ? (
        <div className="homeBtn" onClick={() => nav("/")}>
          🏠
        </div>
      ) : (
        <div className="empty"></div>
      )}
      <div className="title">{text}</div>
      <div className="empty"></div>
    </div>
  );
};
