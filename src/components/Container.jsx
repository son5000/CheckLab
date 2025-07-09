import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

export default function Container() {
  return (
    <div className="container">
      <Header />
      <Aside />
      <Outlet />
      <Footer />
    </div>
  );
}
