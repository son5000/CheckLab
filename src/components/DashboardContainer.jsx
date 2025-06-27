import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

export default function DashboardContainer() {
  return (
    <div className="DashboardContainer max_width_1600">
      <Header />
      <Aside />
      <Outlet />
      <Footer />
    </div>
  );
}
