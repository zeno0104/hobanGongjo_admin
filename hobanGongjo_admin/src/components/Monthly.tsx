import React, { useState } from "react";
import "./Monthly.css";

export const Monthly = () => {
  // 현재 월을 상태로 관리
  const [currentDate, setCurrentDate] = useState(new Date());

  // 월을 줄이는 함수
  const decreaseMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1); // 한 달 감소
      return newDate;
    });
  };

  // 월을 늘리는 함수
  const increaseMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1); // 한 달 증가
      return newDate;
    });
  };

  // 현재 월을 YYYY-MM 형식으로 표시
  const formattedDate = currentDate.toISOString().slice(0, 7);

  return (
    <section className="monthly">
      <div className="leftBtn" onClick={decreaseMonth}>
        {"<"}
      </div>
      <div>{formattedDate}</div>
      <div className="rightBtn" onClick={increaseMonth}>
        {">"}
      </div>
    </section>
  );
};
