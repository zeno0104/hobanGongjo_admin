import { useContext, useEffect, useState } from "react";
import { CurrentDataContext, UserDataContext } from "../App";
import { getUserData } from "../apis/api";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";

// 상태 타입을 명확하게 정의
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
  const userData = useContext(UserDataContext) as Data[] | null; // 🔥 명확한 타입 지정
  const [updatedUserData, setUpdatedUserData] = useState<Data[]>([]); // 🔥 초기값을 빈 배열로 설정

  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (Array.isArray(data)) {
        setUpdatedUserData(data as Data[]); // 🔥 데이터 타입을 명확하게 지정
      } else {
        console.error("데이터가 배열 형식이 아닙니다.", data);
      }
    };
    fetchData();
  }, [selectedDate]);

  // userData가 유효한 배열인지 확인 후 업데이트
  useEffect(() => {
    if (Array.isArray(userData)) {
      setUpdatedUserData(userData);
    } else {
      console.warn(
        "UserDataContext에서 받은 데이터가 유효하지 않습니다.",
        userData
      );
    }
  }, [userData]);

  if (!Array.isArray(updatedUserData)) {
    console.error("userData는 배열이 아닙니다.");
    return null; // 또는 에러 처리 UI
  }

  // 🔥 필터링할 때 타입 확인
  const filteredData = updatedUserData.filter((item) => {
    if (!item || typeof item.created_at !== "string" || !item.status) {
      console.warn("잘못된 데이터가 포함되어 있습니다.", item);
      return false;
    }

    const userDate = `${new Date(item.created_at).getFullYear()}-${new Date(
      item.created_at
    ).getMonth()}`;

    return item.status === "installFinished" && userDate === selectedDate;
  });

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
