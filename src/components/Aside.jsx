import { useLocation, Link } from "react-router-dom";

export default function Aside() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  const firstSegment = segments[0] || "";
  const secondSegment = segments[1] || "";
  return (
    <aside>
      <ul>
        <li>
          <Link
            className={firstSegment === "project" ? "active" : ""}
            to="/project"
          >
            프로젝트
          </Link>
          <ul>
            <li>
              <Link
                className={secondSegment === "fileUpload" ? "active" : ""}
                to="/project/fileUpload"
              >
                파일 업로드
              </Link>
            </li>
            <li>
              <Link
                className={secondSegment === "History" ? "active" : ""}
                to="/project/History"
              >
                파일 관리
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}
