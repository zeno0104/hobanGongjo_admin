import { useNavigate } from "react-router-dom";
import "./Users.css";

type Data = {
  id: number;
  state: string;
  userName: string;
  region: string;
  date: string;
};
export const Users = ({ data }: Data) => {
  const { id, state, userName, region, date } = data;
  const nav = useNavigate();

  return (
    <div
      className="Users"
      onClick={() => {
        console.log(data);
        nav(`/details/${id}`);
      }}
    >
      <div className={`state state_${state}`}>
        {state === true ? "완료" : "미완료"}
      </div>
      <div className="userName">{userName}</div>
      <div className="region">{region}</div>
      <div className="date">{date}</div>
    </div>
  );
};
