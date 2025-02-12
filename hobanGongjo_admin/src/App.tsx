import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { CounselIncomplete } from "./pages/CounselIncomplete";
import { Details } from "./pages/Details";
import { createContext, useEffect, useState } from "react";
import { CounselComplete } from "./pages/CounselComplete";
import { getUserData } from "./apis/api";

export const UserDataContext = createContext();

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      if (data && data.length > 0) {
        setUserData(data);
      }
      setLoading(false); // 데이터 로드 후 로딩 상태 변경
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <UserDataContext.Provider value={userData}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counselIncomplete" element={<CounselIncomplete />} />
        <Route path="/counselComplete" element={<CounselComplete />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </UserDataContext.Provider>
  );
}

export default App;
