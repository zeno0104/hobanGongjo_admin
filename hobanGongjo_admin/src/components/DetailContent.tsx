import { Button } from "./Button";
import {
  deleteUserData,
  updateCounselData,
  updateInstallConfirmData,
  updateInstallFinished,
} from "../apis/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../App";

// ✅ status 타입 정의
type StatusType =
  | "counselIncompleted"
  | "counselCompleted"
  | "installConfirm"
  | "installFinished";

// ✅ Data 타입 수정 (status를 StatusType으로 변경)
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
  status: StatusType;
};

const userStatus: Record<
  StatusType,
  { status: string; text?: string; type: string }
> = {
  counselIncompleted: {
    status: "상담 미완료",
    text: "상담 완료",
    type: "reserve_confirm",
  },
  counselCompleted: {
    status: "상담 완료",
    text: "설치 확정",
    type: "reserve_confirm",
  },
  installConfirm: {
    status: "설치 확정",
    text: "설치 완료",
    type: "reserve_confirm",
  },
  installFinished: {
    status: "설치 완료",
    type: "reserve_confirm",
  },
};

export const DetailContent = ({ data }: { data: Data }) => {
  const {
    id,
    content,
    install_location,
    name,
    phone_number,
    region,
    type,
    status,
  } = data;
  const { fetchData, userData, setUserData } = useContext(UserDataContext);
  const nav = useNavigate();
  const changedProductType = JSON.parse(type);

  const confirmBtnHandler = async () => {
    if (window.confirm("상담을 완료하시겠습니까?")) {
      await updateCounselData(id);
      await fetchData();
      window.alert("상담이 완료되었습니다.");
      nav("/", { replace: true });
    }
  };

  const installConfirm = async () => {
    if (window.confirm("설치를 확정하시겠습니까?")) {
      await updateInstallConfirmData(id);
      await fetchData();
      window.alert("설치가 확정되었습니다.");
      nav("/", { replace: true });
    }
  };

  const installFinished = async () => {
    if (window.confirm("설치를 완료하시겠습니까?")) {
      await updateInstallFinished(id);
      await fetchData();
      window.alert("설치가 완료되었습니다.");
      nav("/", { replace: true });
    }
  };

  const deleteBtnHandler = async () => {
    if (window.confirm("상담 내역을 삭제하시겠습니까?")) {
      await deleteUserData(id);
      // userData에서 삭제된 아이템을 반영한 후, 상태를 업데이트하여 UI를 리렌더링
      const updatedData = userData.filter((item) => item.id !== id);
      setUserData(updatedData);
      window.alert("상담 내역을 삭제했습니다.");
      nav("/", { replace: true });
    }
  };

  const buttonHandler: Partial<Record<StatusType, { onClick: () => void }>> = {
    counselIncompleted: { onClick: confirmBtnHandler },
    counselCompleted: { onClick: installConfirm },
    installConfirm: { onClick: installFinished },
  };

  return (
    <>
      <section className="state">
        <div>상태</div>
        <div>{userStatus[status].status}</div>
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
        {status !== "installFinished" && userStatus[status]?.text ? (
          <div className="confirmBtnCon">
            <Button
              text={userStatus[status].text!}
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              onClick={buttonHandler[status]?.onClick!} // `onClick`이 없는 경우 방지
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
