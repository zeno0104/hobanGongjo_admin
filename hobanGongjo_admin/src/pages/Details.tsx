import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import "./Details.css";
import { useContext } from "react";
import { UserDataContext } from "../App";
import { DetailContent } from "../components/DetailContent";

export const Details = () => {
  const params = useParams();
  const nav = useNavigate();
  const userData = useContext(UserDataContext);
  const filteredData = userData.filter(
    (item) => Number(item.id) === Number(params.id)
  );

  // filteredData가 비어있을 경우 처리
  if (filteredData.length === 0) {
    window.alert("존재하지 않는 데이터입니다.");
    nav("/", { replace: true });
    return null; // 컴포넌트 렌더링 중단
  }
  return (
    <div className="Details">
      <Header text={"상세 내용"} />
      <DetailContent data={filteredData[0]} />
    </div>
  );
};
