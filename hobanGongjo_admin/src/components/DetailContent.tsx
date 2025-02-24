import { Button } from "./Button";
import {
  deleteUserData,
  updateCounselData,
  updateInstallConfirmData,
  updateInstallFinished,
} from "../apis/api";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserDataContext } from "../App";
import "./DetailContent.css";
import { supabase } from "../utils/SupabaseClient";
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
  memo: string;
  address: string;
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
    memo,
    address,
  } = data;
  const { fetchData, userData, setUserData } = useContext(UserDataContext);
  const nav = useNavigate();
  const changedProductType = JSON.parse(type);
  const [memoState, setMemoState] = useState(true);
  const [memoInfo, setMemoInfo] = useState(memo);
  const [addressState, setAddressState] = useState(true);
  const [addressInfo, setAddressInfo] = useState(address);

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
  // 메모
  const memoEditHandler = () => {
    setMemoState(false);
  };
  const memoConfirmHandler = async () => {
    const { error } = await supabase
      .from("guest")
      .update({ memo: memoInfo })
      .eq("id", id);

    if (error) {
      window.alert(error.message);
      return;
    }

    // 현재 userData를 업데이트하여 변경 사항 반영
    const updatedData = userData.map((item) =>
      item.id === id ? { ...item, memo: memoInfo } : item
    );

    setUserData(updatedData);
    console.log(userData);
    setMemoState(true);
  };

  const memoInfoHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoInfo(e.target.value);
  };
  // 주소
  const addressEditHandler = () => {
    setAddressState(false);
  };
  const addressConfirmHandler = async () => {
    const { error } = await supabase
      .from("guest")
      .update({ address: addressInfo })
      .eq("id", id);

    if (error) {
      window.alert(error.message);
      return;
    }

    // 현재 userData를 업데이트하여 변경 사항 반영
    const updatedData = userData.map((item) =>
      item.id === id ? { ...item, address: addressInfo } : item
    );

    setUserData(updatedData);
    console.log(userData);
    setAddressState(true);
  };
  const addressInfoHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddressInfo(e.target.value);
  };
  const openTMap = () => {
    const encodedAddress = encodeURIComponent(address);
    const tmapUrl = `tmap://search?name=${encodedAddress}`;
    window.location.href = tmapUrl;
  };
  return (
    <>
      <section className="state">
        <div className="title">상태</div>
        <div>{userStatus[status].status}</div>
      </section>
      <section className="name">
        <div className="title">이름 or 상호</div>
        <div>{name}</div>
      </section>
      <section className="phone_number">
        <div className="title">연락처</div>
        <div>{phone_number}</div>
        <div className="phone_info">
          <a href={`tel:${phone_number}`}>
            <img className="phone_img" src="/call.jpg" />
          </a>
        </div>
      </section>

      <section className="address">
        <div className="title">주소</div>
        <div>
          <textarea
            readOnly={false}
            className="address_text"
            disabled={addressState}
            onChange={addressInfoHandler}
            value={addressState ? address : addressInfo}
          ></textarea>
        </div>
        <div className="addressInfo">
          <div>
            <Button
              onClick={
                addressState ? addressEditHandler : addressConfirmHandler
              }
              text={addressState ? "수정" : "확인"}
              type="addressBtn"
            />
          </div>
          <div>{<Button text="티맵" type="tmapBtn" onClick={openTMap} />}</div>
        </div>
      </section>
      <section className="region">
        <div className="title">지역</div>
        <div>{region}</div>
      </section>

      <section className="installLocation">
        <div className="title">설치 장소</div>
        <div>{install_location}</div>
      </section>
      <section className="installProduct">
        <div className="title">설치 기기</div>
        <div>{changedProductType.join(", ")}</div>
      </section>
      <section className="content">
        <div className="content_title title">문의 내용</div>
        <div className="content_text">{content}</div>
      </section>
      <section className="memo">
        <div className="title">메모</div>
        <div>
          <textarea
            readOnly={false}
            className="memo_text"
            disabled={memoState}
            onChange={memoInfoHandler}
            value={memoState ? memo : memoInfo}
          ></textarea>
        </div>
        <div>
          <Button
            onClick={memoState ? memoEditHandler : memoConfirmHandler}
            text={memoState ? "수정" : "확인"}
            type="memoBtn"
          />
        </div>
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
