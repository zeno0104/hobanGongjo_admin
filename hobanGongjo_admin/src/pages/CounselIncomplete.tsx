import { useContext } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import "./CounselIncomplete.css";
import { CurrentDataContext, UserDataContext } from "../App";
// 상담 미완료건

export const CounselIncomplete = () => {
  const { userData } = useContext(UserDataContext);

  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  // userData가 배열인지 확인
  if (!Array.isArray(userData)) {
    console.error("userData는 배열이 아닙니다.");
    return null; // 또는 적절한 에러 처리
  }

  // 각 요소가 Data 타입인지 확인
  const filterdData = userData.filter((item) => {
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
