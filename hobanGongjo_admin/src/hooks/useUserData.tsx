import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../App";
import { useNavigate } from "react-router-dom";

const useUserData = (id: number) => {
  const data = useContext(UserDataContext);
  const currentUserItem = data.find((item) => String(item.id) === String(id));
  const nav = useNavigate();
  const [curUserItem, setCurUserItem] = useState();

  useEffect(() => {
    if (!currentUserItem) {
      window.alert("존재하지 않는 데이터 입니다.");
      nav("/", { replace: true });
    }
    setCurUserItem(currentUserItem);
  }, [id]);
  return curUserItem;
};

export default useUserData;
