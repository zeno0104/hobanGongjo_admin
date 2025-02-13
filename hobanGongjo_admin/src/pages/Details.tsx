import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import "./Details.css";
import { Button } from "../components/Button";
import { deleteUserData, updateCounselData } from "../apis/api";
import { useContext } from "react";
import { UserDataContext } from "../App";

export const Details = () => {
  const params = useParams();
  const nav = useNavigate();
  const userData = useContext(UserDataContext);
  const location = useLocation();
  const filteredData = userData.filter(
    (item) => Number(item.id) === Number(params.id)
  );

  // filteredData가 비어있을 경우 처리
  if (filteredData.length === 0) {
    window.alert("존재하지 않는 데이터입니다.");
    nav("/", { replace: true });
    return null; // 컴포넌트 렌더링 중단
  }

  const { type } = location.state;
  const {
    id,
    content,
    install_location,
    is_counsel_completed,
    name,
    phone_number,
    region,
    type: productType,
  } = filteredData[0];

  const changedProductType = JSON.parse(productType);
  const confirmBtnHandler = async () => {
    if (window.confirm("상담을 완료하시겠습니까?")) {
      await updateCounselData(id);
      window.alert("상담을 완료하였습니다.");
      nav("/", { replace: true });
    }
  };
  const deleteBtnHandler = async () => {
    if (window.confirm("상담 내역을 삭제하시겠습니까?")) {
      await deleteUserData(id);
      window.alert("상담 내역을 삭제했습니다.");
      nav("/", { replace: true });
    }
  };

  return (
    <div className="Details">
      <Header text={"상세 내용"} />
      <section className="state">
        <div>상태</div>
        <div>{is_counsel_completed ? "상담 완료" : "상담 미완료"}</div>
      </section>
      <section className="name">
        <div>이름 or 상호</div>
        <div>{name}</div>
      </section>
      <section className="phone_number">
        <div>연락처</div>
        <div>{phone_number}</div>
        <div className="phone_info">
          <a href={`tel:${phone_number}`}>
            <img className="phone_img" src="/call.jpg" />
          </a>
        </div>
      </section>
      <section className="region">
        <div>지역</div>
        <div>{region}</div>
      </section>
      <section className="installLocation">
        <div>설치 장소</div>
        <div>{install_location}</div>
      </section>
      <section className="installProduct">
        <div>설치 기기</div>
        <div>{changedProductType.join(", ")}</div>
      </section>
      <section className="content">
        <div className="content_title">문의 내용</div>
        <div className="content_text">{content}</div>
      </section>
      <section className="confirmBtn">
        {type ? (
          <div className="confirmBtnCon">
            <Button
              text={"설치 확정"}
              onClick={confirmBtnHandler}
              type={"reserve_confirm"}
            />
            <div className="lineBar"></div>
            <Button
              text={"삭제 하기"}
              onClick={deleteBtnHandler}
              type={"delete"}
            />
          </div>
        ) : (
          <div className="confirmBtnCon">
            <Button text={"상담 완료"} onClick={confirmBtnHandler} />
            <Button
              text={"삭제 하기"}
              onClick={deleteBtnHandler}
              type={"delete"}
            />
          </div>
        )}
      </section>
    </div>
  );
};
