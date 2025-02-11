// 홈

import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Home.css";
import { useContext } from "react";
import { UserDataContext } from "../App";
export const Home = () => {
  const nav = useNavigate();
  const data = useContext(UserDataContext);
  const counselIncompleteCnt = data.filter(
    (item) => item.state === false
  ).length;
  const counselCompleteCnt = data.filter((item) => item.state === true).length;
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
