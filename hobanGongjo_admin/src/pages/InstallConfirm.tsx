import { useContext } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { CurrentDataContext, UserDataContext } from "../App";
import { Users } from "../components/Users";

export const InstallConfirm = () => {
  const { userData } = useContext(UserDataContext);
  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  // userData가 배열인지 확인
  if (!Array.isArray(userData)) {
    console.error("userData는 배열이 아닙니다.");
    return null; // 또는 적절한 에러 처리
  }

  // 🔥 status 타입을 강제 변환 후 필터링
  const filteredData = userData
    .map((item) => ({
      ...item,
      status: item.status ?? "counselIncompleted",
    }))
    .filter((item) => {
      const userDate = `${new Date(item.created_at).getFullYear()}-${new Date(
        item.created_at
      ).getMonth()}`;

      return item.status === "installConfirm" && userDate === selectedDate;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="CounselIncomplete">
      <Header text={"설치 확정건"} />
      <Monthly />
      <div className="totalCnt">총 {filteredData.length}건</div>
      {filteredData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
