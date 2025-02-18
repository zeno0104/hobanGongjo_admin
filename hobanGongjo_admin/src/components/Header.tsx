import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

type HeaderProps = {
  text: string;
};

export const Header = ({ text }: HeaderProps) => {
  const nav = useNavigate();
  const location = useLocation();
  const btnValue = location.pathname !== "/";
  console.log(btnValue);
  return (
    <div className="Header">
      {btnValue ? (
        <div className="homeBtn" onClick={() => nav("/", { replace: true })}>
          <img src="/home.png" alt="홈버튼" className="homeBtn" />
        </div>
      ) : (
        <div className="empty"></div>
      )}
      <div className="title">{text}</div>
      <div className="empty"></div>
    </div>
  );
};
