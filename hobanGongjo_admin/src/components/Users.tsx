import { useNavigate } from "react-router-dom";
import "./Users.css";

type Data = {
  content: string;
  created_at: string;
  id: number;
  install_location: string;
  install_type: string;
  is_counsel_completed: boolean;
  is_reserve_completed: boolean;
  name: string;
  phone_number: string;
  region: string;
  type: string;
};

// props 타입 정의
type UsersProps = {
  data: Data; // data prop을 UsersProps에 추가
};

export const Users = ({ data }: UsersProps) => {
  console.log("data다", data);
  const { id, is_counsel_completed, name, region, created_at } = data;
  const nav = useNavigate();
  const date = new Date(created_at).toLocaleDateString();

  return (
    <div
      className="Users"
      onClick={() => {
        nav(`/details/${id}`, {
          state: { type: is_counsel_completed ? true : false },
        });
      }}
    >
      <div className={`state state_${is_counsel_completed}`}>
        {is_counsel_completed ? "완료" : "미완료"}
      </div>
      <div className="userName">{name}</div>
      <div className="region">{region}</div>
      <div className="date">{date}</div>
    </div>
  );
};
