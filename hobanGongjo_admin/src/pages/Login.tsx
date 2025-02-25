import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 로그인 성공 후 이동
import "./Login.css";
import { supabase } from "../utils/SupabaseClient";
import { User } from "../utils/types";

export const Login = () => {
  const [userInfo, setUserInfo] = useState<User>({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  // 이메일 입력 핸들러
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  // 비밀번호 입력 핸들러
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, password: e.target.value });
  };

  // 로그인 핸들러
  const loginHandler = async () => {
    // 이메일과 비밀번호를 입력 받은 값을 사용
    const { email, password } = userInfo;

    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role")
      .eq("email", email) // email로 검색
      .eq("password", password) // 비밀번호 비교 (비밀번호는 보안상 안전하지 않으니 암호화 추천)
      .single();

    if (error || !data) {
      console.error("Login failed:", error?.message);
      window.alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      setUserInfo({
        email: "",
        password: "",
      });

      return;
    }

    // 로그인 성공 시 user_id와 role 정보 저장
    localStorage.setItem("admin_id", data.id);
    // 로그인 후 원하는 페이지로 이동
    navigate("/");
  };

  return (
    <div className="Login">
      <section className="logo">
        <img src="icons/Icon-512.png" alt="호반" className="logo_img" />
      </section>

      <section className="input">
        <div className="email">
          <div>
            <label htmlFor="email" className="inputText">
              이메일
            </label>
          </div>
          <div>
            <input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={emailChangeHandler}
            />
          </div>
        </div>

        <div className="password">
          <label htmlFor="password" className="inputText">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={userInfo.password}
            onChange={passwordChangeHandler}
          />
        </div>

        <button className="loginBtn" onClick={loginHandler}>
          로그인
        </button>
      </section>
    </div>
  );
};
