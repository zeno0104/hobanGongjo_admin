import { useContext } from "react";
import { Header } from "../components/Header";
import { Users } from "../components/Users";
import "./CounselComplete.css";
import { UserDataContext } from "../App";
import { Monthly } from "../components/Monthly";

export const CounselComplete = () => {
  const mockData = useContext(UserDataContext);
  const filterdData = mockData.filter((item) => item.state === true);
  return (
    <div className="CounselIncomplete">
      <Header text={"상담 완료건"} />
      <Monthly />
      <div>총 {filterdData.length}건</div>
      {filterdData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
