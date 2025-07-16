import { useState } from "react";

// _________________ 검색 박스 (연도별 프로젝트 검색)_________________
export default function YearSearchBox({
  isCategorieSelect,
  setIsCategorieSelect,
}) {
  const [inputValue, setInputValue] = useState("");
  const category = [2025, 2024, 2023, 2022, 2021, 2020];
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
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          placeholder={`프로젝트명 검색`}
        />
      </div>
    </div>
  );
}
