import { Link } from "react-router-dom";
import { useAuth } from "../lib/login/LoginAuth";

export default function Header() {
  const { userName } = useAuth();

  return (
    <header className="max_width_1440">
      <h1>
        <Link to="/dashboard">
          <img src="/images/mainLogo.png" alt="" />
        </Link>
      </h1>
      <div>
        <img src="/images/usa_icon.png" alt="" />
        <p>{userName}</p>
      </div>
    </header>
  );
}
