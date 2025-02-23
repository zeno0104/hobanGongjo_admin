import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import "./Home.css";
import { useContext } from "react";
import { UserDataContext } from "../App";

export const Home = () => {
  const nav = useNavigate();
  const { userData } = useContext(UserDataContext); // UserDataContext의 타입을 명시적으로 지정

  const counselIncompleteCnt = userData.filter(
    (item) => item.status === "counselIncompleted"
  ).length;
  const counselCompleteCnt = userData.filter(
    (item) => item.status === "counselCompleted"
  ).length;
  const installConfirmCnt = userData.filter(
    (item) => item.status === "installConfirm"
  ).length;
  const installFinishedCnt = userData.filter(
    (item) => item.status === "installFinished"
  ).length;
  return (
    <div className="Home">
      <Header text={"호반공조 관리자"} />
      <section className="counselInfo">
        <div
          className="counselBtn counselIncomplete"
          onClick={() => nav("/counselIncomplete")}
        >
          <div className="conuselText">상담 미완료</div>
          <div className="counselCnt">{counselIncompleteCnt}건</div>
        </div>
        <div
          className="counselBtn counselComplete"
          onClick={() => nav("/counselComplete")}
        >
          <div className="conuselText">상담 완료</div>
          <div className="counselCnt">{counselCompleteCnt}건</div>
        </div>
      </section>
      <section className="reservationInstallInfo">
        <div
          className="reservationConfirmed"
          onClick={() => nav("/installConfirm")}
        >
          <span className="installText">설치 확정건 {">"}</span>
          <span className="installConfirmCnt">{installConfirmCnt}건</span>
        </div>
        <div
          className="reservationConfirmedFinished"
          onClick={() => nav("/installFinished")}
        >
          <span className="installText">설치 완료건 {">"}</span>
          <span className="installConfirmCnt">{installFinishedCnt}건</span>
        </div>
        {/* <div
          className="reservationConfirmedFinished"
          onClick={() => nav("/schedule")}
        >
          <span className="installText">스케줄 확인 {">"}</span>
        </div> */}
      </section>
    </div>
  );
};
