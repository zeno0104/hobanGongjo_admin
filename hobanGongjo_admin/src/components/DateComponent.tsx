import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./DateComponent.css";
export const DateComponent = ({
  installDate,
  setDateInfo,
}: {
  installDate: string;
  setDateInfo: React.Dispatch<React.SetStateAction<Date | null>>;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    installDate ? new Date(installDate) : null
  );

  const dateHandler = (date: Date | null) => {
    setStartDate(date);
    setDateInfo(date); // Date | null 타입으로 전달
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={dateHandler}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        customInput={<CustomButton selectedDate={startDate} />}
        className="custom-datepicker"
      />
    </div>
  );
};

const CustomButton = ({
  selectedDate,
  onClick,
}: {
  selectedDate: Date | null;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
    >
      {selectedDate ? selectedDate.toLocaleDateString("ko-KR") : "날짜 선택"}
    </button>
  );
};
