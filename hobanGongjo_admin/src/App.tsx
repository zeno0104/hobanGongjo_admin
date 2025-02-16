/* eslint-disable react-refresh/only-export-components */
import "../core/notification/settingFCM";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { CounselIncomplete } from "./pages/CounselIncomplete";
import { Details } from "./pages/Details";
import { createContext, useEffect, useState } from "react";
import { CounselComplete } from "./pages/CounselComplete";
import { getUserData } from "./apis/api";
import { handleAllowNotification } from "./firebase/notification";
import { useFCM } from "./firebase/useFCM";
// import useGuestSubscription from "./hooks/useGuestSubscription";

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
  // useGuestSubscription(); // ✅ 여기에서 실행 (useEffect 내부 X)

  const [userData, setUserData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  useFCM();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data && data.length > 0) {
        setUserData(data);
      }
      setLoading(false);
    };
    fetchData();
    handleAllowNotification();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
