import { useAuth } from "../../lib/login/loginAuth.jsx";
import { useState } from "react";
import { checkUserFromEnv } from "../../lib/login/checkUserFromEnv";
import { useNavigate } from "react-router-dom";

// _________________login Form_________________
export default function LoginForm() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = checkUserFromEnv(inputId, inputPw);

    if (isSuccess) {
      login(inputId);
      navigate("/project");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다");
      navigate("/login");
    }
  };

  return (
    <section className="loginForm">
      <img src="/images/mainLogo.png" alt="" />
      <h2 className="font-quantico">Welcome</h2>
      <p className="font-quantico">PLEASE LOGIN TO UD CHECKGUARD DASHBOARD</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id="inputLoginId"
          onChange={(e) => setInputId(e.target.value)}
          value={inputId}
          placeholder="USERNAME"
          type="text"
        />
        <input
          id="inputLoginPw"
          onChange={(e) => setInputPw(e.target.value)}
          value={inputPw}
          placeholder="PASSWORD"
          type="password"
        />
        <button type="submit">LOGIN</button>
      </form>
    </section>
  );
}
