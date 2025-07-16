import { Link } from "react-router-dom";
import { useAuth } from "../lib/login/loginAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      <h1>
        <Link to="/project">
          <img src="/images/mainLogo.png" alt="" />
        </Link>
      </h1>
      <div>
        <img src="/images/korea_icon.png" alt="" />
        <p>{user?.name}</p>
      </div>
    </header>
  );
}
