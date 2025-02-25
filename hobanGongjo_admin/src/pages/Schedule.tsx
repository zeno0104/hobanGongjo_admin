import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko"; // 한국어 로캘 추가
import { Header } from "../components/Header";
import "./Schedule.css";
import { useContext } from "react";
import { UserDataContext } from "../App";
import { EventContentArg } from "@fullcalendar/core"; // 타입 임포트

export function Schedule() {
  const { userData } = useContext(UserDataContext);

  const events = userData
    .filter(
      (item) =>
        item.status === "installConfirm" || item.status === "installFinished"
    )
    .map((item) => ({
      title: item.name,
      start: new Date(
        new Date(item.installDate).setDate(
          new Date(item.installDate).getDate() + 1
        )
      )
        .toISOString()
        .split("T")[0], // 하루 추가 후 YYYY-MM-DD 포맷 변환
      backgroundColor: item.status === "installFinished" ? "grey" : "",
    }));

  console.log(`events = ${JSON.stringify(events)}`);

  return (
    <div className="Calendar">
      <Header text="캘린더" />
      <div className="colorInfo">
        <div className="beforeInfo">
          <div className="before"></div>
          <div className="beforeText">설치 전</div>
        </div>
        <div className="afterInfo">
          <div className="after"></div>
          <div className="afterText">설치 완료</div>
        </div>
      </div>
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={events}
          locale={koLocale} // 한국어 적용
          eventContent={renderEventContent}
          height="auto" // 🟢 모든 날짜가 보이도록 설정
          // headerToolbar={{
          //   left: "prev,next today", // 🟢 오늘/이전/다음 버튼만 표시
          //   center: "title", // 🟢 중앙에 년/월 표시
          //   right: "", // 🟢 오른쪽 버튼 제거
          // }}
        />
      </div>
    </div>
  );
}

// 커스텀 이벤트 렌더링 함수
export const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
};
