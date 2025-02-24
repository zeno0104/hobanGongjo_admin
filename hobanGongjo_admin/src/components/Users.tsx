import { useNavigate } from "react-router-dom";
import "./Users.css";

// ✅ StatusType 정의 (userStatus의 key 값과 동일해야 함)
type StatusType =
  | "counselIncompleted"
  | "counselCompleted"
  | "installConfirm"
  | "installFinished";

// ✅ Data 타입에서 status의 타입을 StatusType으로 지정
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
  status: StatusType; // 🔹 string → StatusType으로 변경
  memo: string;
  address: string;
};

// props 타입 정의
type UsersProps = {
  data: Data; // data prop을 UsersProps에 추가
};

export const Users = ({ data }: UsersProps) => {
  console.log(`Users에서 data: ${JSON.stringify(data)}`);
  const { id, name, region, created_at, status } = data;
  const nav = useNavigate();
  const date = new Date(created_at).toLocaleDateString();

  // ✅ userStatus 객체의 타입 명확히 지정
  const userStatus: Record<
    StatusType,
    { status: string; text?: string; type: string }
  > = {
    counselIncompleted: {
      status: "미완료",
      text: "상담 완료",
      type: "reserve_confirm",
    },
    counselCompleted: {
      status: "완료",
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
      {/* ✅ status가 userStatus에 있는지 체크 후 접근 */}
      <div className={`state state_${status}`}>
        {status in userStatus ? userStatus[status].status : "알 수 없음"}
      </div>
      <div className="userName">{name}</div>
      <div className="region">{region}</div>
      <div className="date">{date}</div>
    </div>
  );
};
