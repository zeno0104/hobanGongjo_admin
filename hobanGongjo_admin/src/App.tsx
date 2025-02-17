import "../core/notification/settingFCM";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import { Home } from "./pages/Home";
import { CounselIncomplete } from "./pages/CounselIncomplete";
import { Details } from "./pages/Details";
import { CounselComplete } from "./pages/CounselComplete";
import { getUserData } from "./apis/api";
import { handleAllowNotification } from "./firebase/notification";

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

export const UserDataContext = createContext<Data[]>([]);
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
  console.log(localStorage.getItem("user_id"));
  // console.log(localStorage.getItem("fcm_token"));
  console.log("메롱메롱");

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
