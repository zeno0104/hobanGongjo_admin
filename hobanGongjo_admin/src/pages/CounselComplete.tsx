import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import "./CounselIncomplete.css";
import { CurrentDataContext, UserDataContext } from "../App";
import { getUserData } from "../apis/api";

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

export const CounselComplete = () => {
  const userData = useContext(UserDataContext);

  // ✅ 기본값을 명확하게 지정 (userData가 없을 경우 빈 배열)
  const [updatedUserData, setUpdatedUserData] = useState<Data[]>(
    (userData as Data[]) || []
  );

  const { currentDate } = useContext(CurrentDataContext);
  const selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();

      if (Array.isArray(data)) {
        // ✅ status 필드가 존재하는 데이터만 필터링
        const validData = data.filter(
          (item): item is Data => item.status !== undefined
        );

        setUpdatedUserData(validData);
      }
    };
    fetchData();
  }, [selectedDate]);

  // ✅ userData가 배열인지 확인
  if (!Array.isArray(updatedUserData)) {
    console.error("userData는 배열이 아닙니다.");
    return null;
  }

  // ✅ status 필드가 있는 데이터만 필터링
  const filteredData = updatedUserData.filter((item) => {
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
