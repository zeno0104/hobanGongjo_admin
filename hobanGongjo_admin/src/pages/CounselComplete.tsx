import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import "./CounselIncomplete.css";
import { CurrentDataContext, UserDataContext } from "../App";
import { getUserData } from "../apis/api";

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

export const CounselComplete = () => {
  const userData = useContext(UserDataContext);
  const [updatedUserData, setUpdatedUserData] = useState<Data[]>(
    userData || []
  ); // 초기값을 빈 배열로 설정
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
  const filterdData = updatedUserData
    .filter(
      (item): item is Data =>
        typeof item === "object" &&
        item !== null &&
        "is_counsel_completed" in item
    )
    .filter((item) => {
      const userDate = `${new Date(item.created_at).getFullYear()}-${new Date(
        item.created_at
      ).getMonth()}`;
      return item.is_counsel_completed === true && userDate === selectedDate;
    });

  return (
    <div className="CounselIncomplete">
      <Header text={"상담 완료건"} />
      <Monthly />
      <div className="totalCnt">총 {filterdData.length}건</div>
      {filterdData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
