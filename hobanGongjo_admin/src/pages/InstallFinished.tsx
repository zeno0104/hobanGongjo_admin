import { useContext } from "react";
import { CurrentDataContext, UserDataContext } from "../App";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";

// 상태 타입을 명확하게 정의

export const InstallFinished = () => {
  // 🔥 useContext의 타입을 올바르게 구조 분해 할당
  const { userData } = useContext(UserDataContext);
  const { currentDate } = useContext(CurrentDataContext);

  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  // userData가 배열이 아닐 경우 예외 처리
  if (!Array.isArray(userData)) {
    console.error("userData는 배열이 아닙니다.");
    return <div>데이터를 불러올 수 없습니다.</div>; // UI 처리
  }

  // 🔥 status 값이 없을 경우 기본값을 `StatusType`으로 변환하여 설정
  const filteredData = userData
    .map((item) => ({
      ...item,
      status: item.status ?? "counselIncompleted", // 🔥 타입 강제 변환
    }))
    .filter((item) => {
      if (!item || typeof item.created_at !== "string") {
        console.warn("잘못된 데이터가 포함되어 있습니다.", item);
        return false;
      }

      const userDate = `${new Date(item.created_at).getFullYear()}-${new Date(
        item.created_at
      ).getMonth()}`;

      return item.status === "installFinished" && userDate === selectedDate;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="CounselIncomplete">
      <Header text={"설치 완료건"} />
      <Monthly />
      <div className="totalCnt">총 {filteredData.length}건</div>
      {filteredData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
