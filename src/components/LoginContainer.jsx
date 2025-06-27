import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function LoginContainer() {
  return (
    <div className="loginContainer max_width_1440">
      <div>
        <div>
          <img src="/images/ud1000_sampleimg_1.png" alt="" />
        </div>
        <section>
          <Outlet />
        </section>
      </div>
      <Footer />
    </div>
  );
}
