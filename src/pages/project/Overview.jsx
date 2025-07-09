import { useState } from "react";

const category = [2020, 2021, 2022, 2023, 2024, 2025];

// _________________Home Content Container _________________
export default function Overview() {
  const [isCategorieSelect, setIsCategorieSelect] = useState(2025);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <section className="home content">
      <h2>프로젝트</h2>
      <div>
        <SearchBox
          category={category}
          setIsCategorieSelect={setIsCategorieSelect}
          isCategorieSelect={isCategorieSelect}
        />
        <button onClick={() => setIsPopupOpen(true)}>프로젝트 만들기</button>
      </div>
      {isPopupOpen && <CreateProject handlePopupClose={handlePopupClose} />}
      <p>
        <span>Projects / </span>
        <span>Project {isCategorieSelect}</span>
      </p>
      <ProjectList />
    </section>
  );
}

// _________________ 검색 박스 (연도별 프로젝트 검색)_________________
function SearchBox({ category, isCategorieSelect, setIsCategorieSelect }) {
  return (
    <div className="searchBox">
      <p>{isCategorieSelect}</p>
      <ul className={isCategorieSelect ? "active" : ""}>
        {category.map((item) => (
          <li onClick={() => setIsCategorieSelect(item)} key={item}>
            {item}
          </li>
        ))}
      </ul>
      <div>
        <input value={""} type="text" placeholder={`프로젝트명 검색`} />
      </div>
    </div>
  );
}

// _________________  프로젝트 생성 popup_________________
export function CreateProject({ handlePopupClose }) {
  return (
    <div className="createProject">
      <div>
        <div>
          <p>새 프로젝트</p>
          <button onClick={handlePopupClose} type="button">
            닫기
          </button>
        </div>
        <form>
          <label htmlFor="projectName">프로젝트명</label>
          <input
            id="projectName"
            type="text"
            placeholder="프로젝트명을 입력해 주세요"
          />

          <label htmlFor="serviceName">용역명</label>
          <input
            id="serviceName"
            type="text"
            placeholder="용역명을 입력해 주세요"
          />

          <label htmlFor="dateValue">진단 기간</label>
          <input
            id="dateValue"
            type="text"
            placeholder="진단 기간을 입력해 주세요"
          />

          <label htmlFor="agencyName">용역업체명</label>
          <input
            id="agencyName"
            type="text"
            placeholder="용역업체명을 입력해 주세요"
          />

          <label htmlFor="diagnosisPurpose">진단 목적</label>
          <textarea
            id="diagnosisPurpose"
            placeholder="진단 목적을 입력해 주세요"
          />
          <button type="submit">프로젝트 생성</button>
        </form>
      </div>
    </div>
  );
}

// _________________ project Table _________________
export function ProjectList() {
  return (
    <table className="projectList">
      <thead>
        <tr>
          <th>생성일</th>
          <th>프로젝트명</th>
          <th>진단 기간</th>
          <th>용역업체명</th>
          <th>편집</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2025-07-09</td>
          <td>서울지하철 점검</td>
          <td>ABC엔지니어링</td>
          <td>2025.07.01 ~ 2025.07.15</td>
          <td>
            <button type="button">편집</button>
          </td>
        </tr>
        <tr>
          <td>2025-07-01</td>
          <td>한강교량 안전진단</td>
          <td>세이프코어</td>
          <td>2025.06.10 ~ 2025.06.30</td>
          <td>
            <button type="button">편집</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// _________________ 프로젝트 단위의 요소 _________________
export function ListItem() {
  return <tr></tr>;
}
