import { Outlet } from "react-router-dom";
import Footer from "../Footer";

export default function LoginContainer() {
  return (
    <div className="loginContainer max_width_1440">
      <div>
        <div>
          <img src="/images/ud-1000_model_ver2.gif" alt="" />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
