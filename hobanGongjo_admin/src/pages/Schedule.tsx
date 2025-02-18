import { useState } from "react";
import "./Schedule.css";
import Calendar from "react-calendar";
import { Header } from "../components/Header";
import "react-calendar/dist/Calendar.css";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Schedule = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Header text="캘린더" />
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
