import { useAuth } from "../../lib/login/loginAuth.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUserLogin } from "../../lib/api/postUserLogin.js";

// _________________login Form_________________
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await postUserLogin(email, inputPw);
    if (result.success) {
      alert(result.message);
      login(result.user);
      navigate("/project");
    } else {
      alert(result.message);
      navigate("/");
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
