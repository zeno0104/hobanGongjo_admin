import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";

import { CounselIncomplete } from "./pages/CounselIncomplete";
import { Details } from "./pages/Details";
import { createContext } from "react";
import { CounselComplete } from "./pages/CounselComplete";
const mockData: Users = [
  {
    id: 1,
    state: true,
    userName: "안재훈",
    region: "강북",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    state: false,
    userName: "김혜경",
    region: "도봉",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    state: true,
    userName: "곽수빈",
    region: "노원",
    date: new Date().toLocaleDateString(),
  },
];
export const UserDataContext = createContext();

function App() {
  return (
    <UserDataContext.Provider value={mockData}>
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
