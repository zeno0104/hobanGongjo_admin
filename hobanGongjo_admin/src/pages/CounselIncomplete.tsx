import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import "./CounselIncomplete.css";
import { CurrentDataContext, UserDataContext } from "../App";
import { getUserData } from "../apis/api";
// 상담 미완료건
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

export const CounselIncomplete = () => {
  const userData = useContext(UserDataContext);
  const [updatedUserData, setUpdatedUserData] = useState<Data[]>(
    (userData as Data[]) || []
  );

  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data) {
        // data가 null이 아닐 때만 업데이트
        setUpdatedUserData(data);
      }
    };
    fetchData();
  }, [selectedDate]);

  // userData가 배열인지 확인
  if (!Array.isArray(updatedUserData)) {
    console.error("userData는 배열이 아닙니다.");
    return null; // 또는 적절한 에러 처리
  }

  // 각 요소가 Data 타입인지 확인
  const filterdData = updatedUserData.filter((item) => {
    const userDate = `${new Date(item.created_at).getFullYear()}-${new Date(
      item.created_at
    ).getMonth()}`;
    return item.status === "counselIncompleted" && userDate === selectedDate;
  });

  return (
    <div className="CounselIncomplete">
      <Header text={"상담 미완료건"} />
      <Monthly />
      <div className="totalCnt">총 {filterdData.length}건</div>
      {filterdData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
