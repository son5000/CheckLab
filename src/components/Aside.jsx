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
          >
            exsample 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            exsample 3
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            exsample 4
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            exsample 5
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
