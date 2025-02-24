import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import "./Details.css";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../App";
import { DetailContent } from "../components/DetailContent";

// 🔥 Data 타입 정의 (일관성 유지)
type StatusType =
  | "counselIncompleted"
  | "counselCompleted"
  | "installConfirm"
  | "installFinished";

type Data = {
  id: number;
  content: string;
  created_at: string;
  install_location: string;
  install_type: string;
  name: string;
  phone_number: string;
  region: string;
  type: string;
  status: StatusType;
  memo: string;
  address: string;
};

export const Details = () => {
  const params = useParams();
  const { userData } = useContext(UserDataContext);

  // selectedData 상태에 Data | null 타입 지정
  const [selectedData, setSelectedData] = useState<Data | null>(null);

  useEffect(() => {
    if (!Array.isArray(userData)) {
      console.error(
        "UserDataContext에서 받은 데이터가 유효하지 않습니다.",
        userData
      );
      return;
    }

    // 🔥 데이터 필터링
    const filteredData = userData.filter(
      (item) => Number(item.id) === Number(params.id)
    );

    if (filteredData.length > 0) {
      setSelectedData(filteredData[0]);
    } else {
      setSelectedData(null); // 데이터가 없으면 null 설정
    }
  }, [userData, params.id]);

  return (
    <div className="Details">
      <Header text={"상세 내용"} />
      {/* selectedData가 null일 경우, 에러를 방지하도록 처리 */}
      {selectedData ? (
        <DetailContent data={selectedData} />
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};
