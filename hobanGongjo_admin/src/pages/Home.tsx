import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../App";
import { getUserData } from "../apis/api";

// Data 타입 정의
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

export const Home = () => {
  const nav = useNavigate();
  const userData = useContext(UserDataContext) as Data[]; // UserDataContext의 타입을 명시적으로 지정

  const [updatedUserData, setUpdatedUserData] = useState<Data[]>(
    userData || []
  ); // 초기값을 Data[]로 설정

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data) {
        setUpdatedUserData(data); // data가 null이 아닐 때만 업데이트
      }
    };
    fetchData();
  }, []); // 컴포넌트가 마운트될 때 데이터 가져오기

  const counselIncompleteCnt = updatedUserData.filter(
    (item) => item.is_counsel_completed === false
  ).length;
  const counselCompleteCnt = updatedUserData.filter(
    (item) => item.is_counsel_completed === true
  ).length;

  return (
    <div className="Home">
      <Header text={"호반공조 관리자"} />
      <section className="counselInfo">
        <div
          className="counselBtn counselIncomplete"
          onClick={() => nav("/counselIncomplete")}
        >
          <div className="conuselText">상담 미완료건</div>
          <div className="counselCnt">{counselIncompleteCnt}건</div>
        </div>
        <div
          className="counselBtn counselComplete"
          onClick={() => nav("/counselComplete")}
        >
          <div className="conuselText">상담 완료건</div>
          <div className="counselCnt">{counselCompleteCnt}건</div>
        </div>
      </section>
      <section className="reservationInstallInfo">
        <div className="reservationConfirmed">예약 확정건 {">"}</div>
        <div>설치 완료건 {">"}</div>
      </section>
    </div>
  );
};
