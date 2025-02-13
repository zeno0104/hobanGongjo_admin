/* eslint-disable react-refresh/only-export-components */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { CounselIncomplete } from "./pages/CounselIncomplete";
import { Details } from "./pages/Details";
import { createContext, useEffect, useState } from "react";
import { CounselComplete } from "./pages/CounselComplete";
import { getUserData } from "./apis/api";
// firebase
import { requestNotificationPermission } from "./notifications";
import { listenForNewRequests } from "./apis/pushNotification";

// Firebase 초기화
// 허가 요청 및 토큰 받기
// Data 타입 정의
type Data = {
  content: string;
  created_at: string;
  id: number;
  install_location: string;
  install_type: string;
  is_counsel_completed: boolean;
  is_reserve_completed: boolean;
  name: string;
  phone_number: string;
  region: string;
  type: string;
};

// UserDataContext의 기본값을 빈 배열로 설정
export const UserDataContext = createContext<Data[]>([]);

// CurrentDataContext의 기본값을 현재 날짜와 빈 함수로 설정
export const CurrentDataContext = createContext<{
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}>({
  currentDate: new Date(),
  setCurrentDate: () => {}, // 기본값은 빈 함수로 설정
});

function App() {
  // userData의 타입을 Data[]로 명시적으로 설정
  const [userData, setUserData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data && data.length > 0) {
        setUserData(data); // 이제 타입이 일치하므로 오류가 발생하지 않음
      }
      setLoading(false); // 데이터 로드 후 로딩 상태 변경
    };
    fetchData();
    console.log("여기 실행됐어!");
    requestNotificationPermission();
    listenForNewRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }
  return (
    <UserDataContext.Provider value={userData}>
      <CurrentDataContext.Provider value={{ currentDate, setCurrentDate }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counselIncomplete" element={<CounselIncomplete />} />
          <Route path="/counselComplete" element={<CounselComplete />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </CurrentDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
