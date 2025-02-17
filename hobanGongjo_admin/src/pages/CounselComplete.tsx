import { useContext } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import "./CounselIncomplete.css";
import { CurrentDataContext, UserDataContext } from "../App";

export const CounselComplete = () => {
  const { userData } = useContext(UserDataContext);

  // ✅ 기본값을 명확하게 지정 (userData가 없을 경우 빈 배열)

  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  // ✅ userData가 배열인지 확인
  if (!Array.isArray(userData)) {
    console.error("userData는 배열이 아닙니다.");
    return null;
  }

  // ✅ status 필드가 있는 데이터만 필터링
  const filteredData = userData.filter((item) => {
    const userDate = `${new Date(item.created_at).getFullYear()}-${new Date(
      item.created_at
    ).getMonth()}`;
    return item.status === "counselCompleted" && userDate === selectedDate;
  });

  return (
    <div className="CounselIncomplete">
      <Header text={"상담 완료건"} />
      <Monthly />
      <div className="totalCnt">총 {filteredData.length}건</div>
      {filteredData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
