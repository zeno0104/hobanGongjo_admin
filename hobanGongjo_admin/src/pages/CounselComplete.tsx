import { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Users } from "../components/Users";
import "./CounselComplete.css";
import { UserDataContext } from "../App";
import { Monthly } from "../components/Monthly";
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
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUpdatedUserData(data);
    };
    fetchData();
  }, []);
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
    .filter((item) => item.is_counsel_completed === true);

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
