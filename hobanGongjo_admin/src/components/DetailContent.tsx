import { Button } from "./Button";
import {
  deleteUserData,
  updateCounselData,
  updateInstallConfirmData,
  updateInstallFinished,
} from "../apis/api";
import { useNavigate } from "react-router-dom";
const userStatus = {
  counselIncompleted: {
    status: "상담 미완료",
    text: "상담 완료",
    // onClick: () => confirmBtnHandler(),
    type: "reserve_confirm",
  },
  counselCompleted: {
    status: "상담 완료",
    text: "설치 확정",
    // onClick: () => installConfirm(),
    type: "reserve_confirm",
  },
  installConfirm: {
    status: "설치 확정",
    text: "설치 완료",
    // onClick: () => installFinished(),
    type: "reserve_confirm",
  },
  installFinished: {
    status: "설치 완료",
    type: "reserve_confirm",
  },
};
type Data = {
  content: string;
  created_at: string;
  id: number;
  install_location: string;
  install_type: string;
  name: string;
  phone_number: string;
  region: string;
  type: string;
  status: string;
};

export const DetailContent = ({ data }) => {
  const {
    id,
    content,
    install_location,
    is_counsel_completed,
    name,
    phone_number,
    region,
    type,
    status,
  } = data;
  const nav = useNavigate();
  const changedProductType = JSON.parse(type);
  const confirmBtnHandler = async () => {
    if (window.confirm("상담을 완료하시겠습니까?")) {
      await updateCounselData(id);
      window.alert("상담이 완료되었습니다.");
      nav("/", { replace: true });
    }
  };
  const installConfirm = async () => {
    if (window.confirm("설치를 확정하시겠습니까?")) {
      await updateInstallConfirmData(id);
      window.alert("설치가 확정되었습니다.");
      nav("/", { replace: true });
    }
  };
  const installFinished = async () => {
    if (window.confirm("설치를 완료하시겠습니까?")) {
      await updateInstallFinished(id);
      window.alert("설치가 완료되었습니다.");
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
  const buttonHandler = {
    counselIncompleted: {
      onClick: () => confirmBtnHandler(),
    },
    counselCompleted: {
      onClick: () => installConfirm(),
    },
    installConfirm: {
      onClick: () => installFinished(),
    },
  };
  return (
    <>
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
        {status !== "installFinished" ? (
          <div className="confirmBtnCon">
            <Button
              text={userStatus[status].text}
              onClick={buttonHandler[status].onClick}
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
          <Button
            text={"삭제 하기"}
            onClick={deleteBtnHandler}
            type={"delete"}
          />
        )}
      </section>
    </>
  );
};
