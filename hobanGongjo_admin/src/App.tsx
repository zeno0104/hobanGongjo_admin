import "../core/notification/settingFCM";
import { Route, Routes } from "react-router-dom";
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

  const fetchData = async () => {
    const data = await getUserData();
    if (data && data.length > 0) {
      setUserData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    handleAllowNotification();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserDataContext.Provider value={{ userData, fetchData, setUserData }}>
      <CurrentDataContext.Provider value={{ currentDate, setCurrentDate }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
