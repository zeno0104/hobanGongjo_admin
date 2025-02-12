// 홈

import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../App";
import { getUserData } from "../apis/api";
export const Home = () => {
  const nav = useNavigate();
  const userData = useContext(UserDataContext);
  const [updatedUserData, setUpdatedUserData] = useState(userData);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUpdatedUserData(data);
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
      {/* <section className="reservationInstallInfo">
        <div className="reservationConfirmed">예약 확정건 {">"}</div>
        <div>설치 완료건 {">"}</div>
      </section> */}
    </div>
  );
};
