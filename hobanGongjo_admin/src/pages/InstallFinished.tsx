import { useContext, useEffect, useState } from "react";
import { CurrentDataContext } from "../App";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import { supabase } from "../utils/SupabaseClient";
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

export const InstallFinished = () => {
  // userData 상태의 타입을 Data[]로 명확히 설정
  const [userData, setUserData] = useState<Data[]>([]);

  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  // install_finished 데이터 가져오기
  const getInstallFinishedData = async () => {
    const { data: install_finished, error } = await supabase
      .from("install_finished")
      .select("*");

    if (error) {
      console.error("데이터 로드 오류:", error);
      return;
    }

    if (!Array.isArray(install_finished)) {
      console.error("userData는 배열이 아닙니다.");
      return;
    }
    setUserData(install_finished);
  };

  useEffect(() => {
    getInstallFinishedData();
  }, []);

  // status 값이 없을 경우 기본값을 'counselIncompleted'로 설정하고 필터링
  const filteredData = userData
    .map((item) => ({
      ...item,
      status: item.status ?? "installFinished", // StatusType 값으로 설정
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
