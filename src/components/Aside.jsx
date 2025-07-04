import { NavLink, useLocation } from "react-router-dom";

export default function Aside() {
  const { pathname } = useLocation();
  const second = pathname.split("/", 2);

  return (
    <aside>
      <div className="sideMenuTopBox">
        <img src="/images/ud1000_sampleimg_1.png" alt="" />
      </div>
      <ul className="font-bebas">
        <li>
          <NavLink
            to="/dashboard/fileUpload"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            FILE UPLOAD
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            UPLOAD HISTORY
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          ></NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Create Report
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
