// _________________ 검색 박스 (연도별 프로젝트 검색)_________________
export function YearSearchBox({ isCategorieSelect, setIsCategorieSelect }) {
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
        <input value={""} type="text" placeholder={`프로젝트명 검색`} />
      </div>
    </div>
  );
}
