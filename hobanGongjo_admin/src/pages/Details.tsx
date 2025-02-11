import { useNavigate, useParams } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { Header } from "../components/Header";
import "./Details.css";
import { Button } from "../components/Button";
// 상세 사항
export const Details = () => {
  const params = useParams();
  const nav = useNavigate();
  const data = useUserData(params.id);
  if (!data) {
    return <div>데이터 로딩중...</div>;
  }

  const { state, userName, region, date } = data;
  const confirmBtnHandler = () => {
    if (window.confirm("상담을 완료하시겠습니까?")) {
      // 데이터 변경
      window.alert("상담을 완료하였습니다.");
      nav("/", { replace: true });
    }
  };
  return (
    <div className="Details">
      <Header text={"상세 내용"} />
      <section className="state">
        <div>상태</div>
        <div>{state ? "상담 완료" : "상담 미완료"}</div>
      </section>
      <section className="name">
        <div>이름 or 상호</div>
        <div>{userName}</div>
      </section>
      <section className="phone_number">
        <div>연락처</div>
        <div>010-1234-5678</div>
        <div>
          <a href={`tel:${"010 - 2071 - 2715"}`}>
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
        <div>가정집</div>
      </section>
      <section className="installProduct">
        <div>설치 기기</div>
        <div>스탠드</div>
      </section>
      <section className="content">
        <div className="content_title">문의 내용</div>
        <div className="content_text">
          안녕하세요. 스탠드 에어컨 설치하려고 해요.
        </div>
      </section>
      <section className="confirmBtn">
        <Button text={"상담 완료"} onClick={confirmBtnHandler}>
          상담 완료
        </Button>
      </section>
    </div>
  );
};
