import "../core/notification/settingFCM";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { Home } from "./pages/Home";
import { CounselIncomplete } from "./pages/CounselIncomplete";
import { Details } from "./pages/Details";
import { CounselComplete } from "./pages/CounselComplete";
import { getUserData } from "./apis/api";
import { handleAllowNotification } from "./firebase/notification";
import { InstallConfirm } from "./pages/InstallConfirm";
import { InstallFinished } from "./pages/InstallFinished";
import { Schedule } from "./pages/Schedule";
import { Login } from "./pages/Login";

type StatusType =
  | "counselIncompleted"
  | "counselCompleted"
  | "installConfirm"
  | "installFinished";

type Data = {
  id: number;
  content: string;
  created_at: string;
  install_location: string;
  install_type: string;
  name: string;
  phone_number: string;
  region: string;
  type: string;
  status: StatusType;
};

// UserDataContext 타입 수정
export const UserDataContext = createContext<{
  userData: Data[];
  fetchData: () => Promise<void>;
  setUserData: React.Dispatch<React.SetStateAction<Data[]>>; // setUserData 추가
}>({
  userData: [],
  fetchData: async () => {},
  setUserData: () => {}, // 빈 함수 기본값 설정
});

export const CurrentDataContext = createContext<{
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}>({
  currentDate: new Date(),
  setCurrentDate: () => {},
});

function App() {
  const [userData, setUserData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const nav = useNavigate();

  // 🔹 로그인 체크 후 데이터 가져오기
  useEffect(() => {
    const adminId = localStorage.getItem("admin_id");

    if (!adminId) {
      nav("/login");
      return; // 🔥 return 추가하여 fetchData 실행 방지
    }

    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserData(data || []); // 🔹 데이터가 없어도 빈 배열 유지
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // 🔹 항상 실행되도록 보장
      }
    };

    fetchData();
    handleAllowNotification();
  }, [nav]);

  // 🔹 로딩 중이면 로딩 화면 출력
  // if (loading) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
  //   );
  // }

  return (
    <UserDataContext.Provider
      value={{ userData, fetchData: async () => {}, setUserData }}
    >
      <CurrentDataContext.Provider value={{ currentDate, setCurrentDate }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/counselIncomplete" element={<CounselIncomplete />} />
          <Route path="/counselComplete" element={<CounselComplete />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/installConfirm" element={<InstallConfirm />} />
          <Route path="/installFinished" element={<InstallFinished />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </CurrentDataContext.Provider>
    </UserDataContext.Provider>
  );
}

export default App;
