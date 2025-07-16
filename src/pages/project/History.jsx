import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import sampleData from "../../lib/data/sample.json";
import {
  sortByDateDesc,
  sortByFilenameNumericDesc,
  dataSorting,
} from "../../lib/project/dataSorting";

export default function History() {
  // _____________사용자 별 저장 데이터 수신 Api 필요 _____________

  // _____________원본 데이터_____________
  const [rawData] = useState(sampleData);

  // _____________정렬 데이터_____________
  const [sortedData, setSortedData] = useState([]);

  // _____________pageNation 초기 설정_____________
  const [currentData, setCurrentData] = useState([]);
  // _____________페이지당 최대 표시 item 수 설정 _____________
  const itemsPerPage = 20;

  // _____________검색 input 설정 초기값 _____________
  const [searchInput, setSearchInput] = useState("");
  // _____________검색 input dropDown menu (초기 세팅) _____________
  const [isCategorieSelect, setIsCategorieSelect] = useState("파일명");
  // _____________Column 클릭시 sorting 제어 (asc, desc) toggle boolean _____________
  // _____________0: 등록일, 1:파일명, 2: 오류구분, 3: 설비구분, 4: 장소, 5: 설비명
  const [sortingOption, setSortingOption] = useState(Array(7).fill(false));

  // _____________첫 렌더링시에 진행 할 데이터 정렬_____________
  // _____________1.파일명 내림차순 => 2. 등록일 내림차순 (최신순으로 정렬)
  useEffect(() => {
    setSortedData(sortByDateDesc(sortByFilenameNumericDesc(rawData)));
  }, [rawData]);

  return (
    <section className="history content">
      <h2>파일 관리</h2>
      <p>
        All uploaded files are available here. Feel free to check or reuse any
        data you need.
      </p>
      <div>
        <SearchBox
          rawData={rawData}
          setSortedData={setSortedData}
          isCategorieSelect={isCategorieSelect}
          setIsCategorieSelect={setIsCategorieSelect}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <ul>
          <Column
            sortingOption={sortingOption}
            setSortingOption={setSortingOption}
            sortedData={sortedData}
            setSortedData={setSortedData}
          />
          <Item data={currentData} />
        </ul>
      </div>
      <PageNation
        data={sortedData}
        itemsPerPage={itemsPerPage}
        setCurrentData={(dataForPage) => setCurrentData(dataForPage)}
      />
    </section>
  );
}

// ______________인풋 파일 검색______________
export function SearchBox({
  rawData,
  setSortedData,
  isCategorieSelect,
  setIsCategorieSelect,
  searchInput,
  setSearchInput,
}) {
  const firstRender = useRef(true);

  // _____________카테고리 항목_____________
  const category = ["파일명", "설비구분", "장소", "설비명"];
  // _____________클릭 항목 전달받아 실제 데이터의 key값으로 변경_____________
  const getCategoryKey = (label) => {
    switch (label) {
      case "파일명":
        return "fileName";
      case "설비구분":
        return "category";
      case "장소":
        return "location";
      case "설비명":
        return "equipment";
      default:
        return "";
    }
  };
  // _____________input change handler_____________
  // _____________원본 데이터에서 filter 복사 배열 => sortedData
  const handleChangeInput = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const selectedCategory = getCategoryKey(isCategorieSelect);
    if (!selectedCategory) return;

    const filtered = rawData.filter((item) =>
      item[selectedCategory]?.toLowerCase().includes(value.toLowerCase())
    );

    setSortedData(filtered);
  };

  // _____________첫 번째 렌더링 시에 진행하는 sort에 영향을 주지 않기 위해 ref로 첫 번째 렌더링 감지_____________
  // _____________input에 값을 먼저 입력하고 dropDownMenu를 변경 할 상황을 고려_____________
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!searchInput) {
      setSortedData(rawData);
      return;
    }

    const selectedCategory = getCategoryKey(isCategorieSelect);
    if (!selectedCategory) return;

    const filtered = rawData.filter((item) =>
      item[selectedCategory]?.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSortedData(filtered);
  }, [isCategorieSelect]);

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
          value={searchInput}
          onChange={handleChangeInput}
          type="text"
          placeholder={`${isCategorieSelect} 검색`}
        />
      </div>
    </div>
  );
}

// ______________상단 소팅 툴바______________
export function Column({
  sortingOption,
  setSortingOption,
  sortedData,
  setSortedData,
}) {
  // _____________Column click sorting event handler_____________
  const handleCategoryClick = (key) => {
    const newOptionsStatus = [...sortingOption];

    const keyIndexMap = {
      date: 0,
      fileName: 1,
      status: 2,
      fileType: 3,
      category: 4,
      location: 5,
      equipment: 6,
    };

    const idx = keyIndexMap[key];

    newOptionsStatus[idx] = !newOptionsStatus[idx];

    setSortingOption(newOptionsStatus);

    const order = newOptionsStatus[idx] ? "asc" : "desc";

    const newSortedData = dataSorting(sortedData, key, order);
    setSortedData(newSortedData);
  };
  return (
    <li>
      <span
        className={sortingOption[0] ? "active" : ""}
        onClick={() => handleCategoryClick("date")}
      >
        등록일
      </span>
      <span
        className={sortingOption[1] ? "active" : ""}
        onClick={() => handleCategoryClick("fileName")}
      >
        파일명
      </span>
      <span onClick={() => handleCategoryClick("status")}>파일 오류</span>
      <span onClick={() => handleCategoryClick("fileType")}>파일 유형</span>
      <span onClick={() => handleCategoryClick("category")}>설비구분</span>
      <span onClick={() => handleCategoryClick("location")}>장소</span>
      <span onClick={() => handleCategoryClick("equipment")}>설비명</span>
    </li>
  );
}

// ______________File List 개별 항목______________
export function Item({ data }) {
  const navigate = useNavigate();

  return (
    <>
      {data.map((item, idx) => (
        <li key={item.id}>
          <span>{item.date}</span>
          <span>
            <Link className="linkStyle_Blue" to={`/project/${idx + 1}/detail`}>
              {item.fileName}
            </Link>
          </span>
          <span>
            <mark className={item.status === "오류" ? "active" : ""}>
              {item.status}
            </mark>
          </span>
          <span>{item.fileType}</span>
          <span>{item.category}</span>
          <span>{item.location}</span>
          <span>{item.equipment}</span>
        </li>
      ))}
    </>
  );
}

// ______________페이지네이션______________
function PageNation({ data = [], itemsPerPage = 20, setCurrentData }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  const getPageData = (page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const changePage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    const sliced = getPageData(validPage);
    setCurrentData(sliced);
  };

  useEffect(() => {
    if (data.length > 0) {
      changePage(1);
    }
  }, [data]);

  const visiblePages = 10;
  const startPage =
    Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <ol>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => changePage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          </li>
        ))}
      </ol>

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
