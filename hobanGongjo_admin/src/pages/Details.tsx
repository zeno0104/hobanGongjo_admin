import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import "./Details.css";
import { useContext } from "react";
import { UserDataContext } from "../App";
import { DetailContent } from "../components/DetailContent";

// 🔥 Data 타입 정의 (일관성 유지)
type StatusType =
  | "counselIncompleted"
  | "counselCompleted"
  | "installConfirm"
  | "installFinished";

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
  status: StatusType;
};

export const Details = () => {
  const params = useParams();
  const nav = useNavigate();
  const userData = useContext(UserDataContext) as Data[] | null; // 🔥 명확한 타입 지정

  // userData가 null이거나 배열이 아닐 경우 대비
  if (!Array.isArray(userData)) {
    console.error(
      "UserDataContext에서 받은 데이터가 유효하지 않습니다.",
      userData
    );
    return null;
  }

  // 🔥 데이터 필터링
  const filteredData = userData.filter(
    (item) => Number(item.id) === Number(params.id)
  );

  // 🔥 filteredData가 비어 있으면 처리
  if (filteredData.length === 0) {
    window.alert("존재하지 않는 데이터입니다.");
    nav("/", { replace: true });
    return null; // 렌더링 중단
  }

  const selectedData = filteredData[0];

  // 🔥 필수 속성 확인
  if (!selectedData.status) {
    console.error("데이터에 'status' 속성이 없습니다.", selectedData);
    return null;
  }

  return (
    <div className="Details">
      <Header text={"상세 내용"} />
      <DetailContent data={selectedData} />
    </div>
  );
};
