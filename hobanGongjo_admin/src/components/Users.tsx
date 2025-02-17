import { useNavigate } from "react-router-dom";
import "./Users.css";

type Data = {
  content: string;
  created_at: string;
  id: number;
  install_location: string;
  install_type: string;
  name: string;
  phone_number: string;
  region: string;
  type: string;
  status: string;
};

// props 타입 정의
type UsersProps = {
  data: Data; // data prop을 UsersProps에 추가
};

export const Users = ({ data }: UsersProps) => {
  const { id, name, region, created_at, status } = data;
  const nav = useNavigate();
  const date = new Date(created_at).toLocaleDateString();
  const userStatus = {
    counselIncompleted: {
      status: "상담 미완료",
      text: "상담 완료",
      type: "reserve_confirm",
    },
    counselCompleted: {
      status: "상담 완료",
      text: "설치 확정",
      type: "reserve_confirm",
    },
    installConfirm: {
      status: "설치 확정",
      text: "설치 완료",
      type: "reserve_confirm",
    },
    installFinished: {
      status: "설치 완료",
      type: "reserve_confirm",
    },
  };

  return (
    <div
      className="Users"
      onClick={() => {
        nav(`/details/${id}`, {
          state: { type: status },
        });
      }}
    >
      <div className={`state state_${status}`}>{userStatus[status].status}</div>
      <div className="userName">{name}</div>
      <div className="region">{region}</div>
      <div className="date">{date}</div>
    </div>
  );
};
