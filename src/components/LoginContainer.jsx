import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function LoginContainer() {
  return (
    <div className="loginContainer max_width_1440">
      <div>
        <div>
          <img src="/images/ud1000Model.gif" alt="" />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
