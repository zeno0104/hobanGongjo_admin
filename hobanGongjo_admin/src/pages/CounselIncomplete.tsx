import { useContext } from "react";
import { Header } from "../components/Header";
import { Monthly } from "../components/Monthly";
import { Users } from "../components/Users";
import "./CounselIncomplete.css";
import { UserDataContext } from "../App";
// 상담 미완료건
interface Users {
  id: number;
  state: boolean;
  userName: string;
  location: string;
  date: string;
}

export const CounselIncomplete = () => {
  const mockData = useContext(UserDataContext);
  const filterdData = mockData.filter((item) => item.state === false);
  return (
    <div className="CounselIncomplete">
      <Header text={"상담 미완료건"} />
      <Monthly />
      <div>총 {filterdData.length}건</div>
      {filterdData.map((item) => (
        <Users key={item.id} data={item} />
      ))}
    </div>
  );
};
