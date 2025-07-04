import { useState, useMemo, useEffect } from "react";

export default function DashboardHistory() {
  const [isCategorieSelect, setIsCategorieSelect] = useState("파일명");
  const [currentData, setCurrentData] = useState([]);
  const itemsPerPage = 20;

  return (
    <section className="history content">
      <h2>Upload History</h2>
      <p>
        All uploaded files are available here. Feel free to check or reuse any
        data you need.
      </p>
      <div>
        <SearchBox
          isCategorieSelect={isCategorieSelect}
          setIsCategorieSelect={setIsCategorieSelect}
        />
        <ul>
          <Column />
          <Item data={currentData} />
        </ul>
      </div>
      <PageNation
        data={sampleData}
        itemsPerPage={itemsPerPage}
        onPageChange={(dataForPage) => setCurrentData(dataForPage)}
      />
    </section>
  );
}

// ______________파일 검색 영역______________
export function SearchBox({ isCategorieSelect, setIsCategorieSelect }) {
  const kategorie = ["파일명", "설비구분", "장소", "설비명"];

  return (
    <div>
      <p>{isCategorieSelect}</p>
      <ul className={isCategorieSelect ? "active" : ""}>
        {kategorie.map((item) => (
          <li onClick={() => setIsCategorieSelect(item)} key={item}>
            {item}
          </li>
        ))}
      </ul>
      <div>
        <input type="text" />
      </div>
    </div>
  );
}

// ______________상단 소팅 툴바______________
export function Column() {
  return (
    <li>
      <span>등록일 ↑</span>
      <span>파일명 ↑</span>
      <span>파일오류</span>
      <span>설비구분</span>
      <span>장소</span>
      <span>설비명</span>
    </li>
  );
}

// ______________File List 개별 항목______________
export function Item({ data }) {
  return (
    <>
      {data.map((item, idx) => (
        <li key={idx}>
          <span>{item.date}</span>
          <span>{item.filename}</span>
          <span>
            <mark className={item.status === "오류" ? "active" : ""}>
              {item.status}
            </mark>
          </span>
          <span>{item.category}</span>
          <span>{item.location}</span>
          <span>{item.equipment}</span>
        </li>
      ))}
    </>
  );
}

// ______________페이지네이션______________
function PageNation({ data = [], itemsPerPage = 20, onPageChange }) {
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
    onPageChange(sliced);
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

const sampleData = [
  {
    id: 1,
    date: "2025. 07. 07 14:20",
    filename: "20250626_150519",
    status: "정상",
    category: "전기설비",
    location: "울산UGPS",
    equipment: "TIE ACB",
    extra: "",
  },
  {
    id: 2,
    date: "2025. 07. 06 14:24",
    filename: "20250625_140312",
    status: "오류",
    category: "전기설비",
    location: "부산항만",
    equipment: "MAIN ACB",
    extra: "",
  },

  {
    id: 1,
    date: "2025. 07. 07 14:20",
    filename: "20250626_150519",
    status: "정상",
    category: "전기설비",
    location: "울산UGPS",
    equipment: "TIE ACB",
    extra: "",
  },
  {
    id: 2,
    date: "2025. 07. 06 14:24",
    filename: "20250625_140312",
    status: "오류",
    category: "전기설비",
    location: "부산항만",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 3,
    date: "2025. 07. 05 15:20",
    filename: "20250624_130133",
    status: "정상",
    category: "기계설비",
    location: "서울지사",
    equipment: "PUMP 01",
    extra: "",
  },
  {
    id: 4,
    date: "2025. 07. 04 16:20",
    filename: "20250623_120908",
    status: "정상",
    category: "계측기기",
    location: "대전본부",
    equipment: "TEMP SENSOR",
    extra: "",
  },
  {
    id: 5,
    date: "2025. 07. 03 17:20",
    filename: "20250622_115011",
    status: "오류",
    category: "전기설비",
    location: "광주센터",
    equipment: "TIE BKR",
    extra: "",
  },
  {
    id: 6,
    date: "2025. 07. 02 17:20",
    filename: "20250621_110430",
    status: "정상",
    category: "기계설비",
    location: "인천지사",
    equipment: "FAN MOTOR",
    extra: "",
  },
  {
    id: 7,
    date: "2025. 07. 01 20:20",
    filename: "20250620_104501",
    status: "정상",
    category: "계측기기",
    location: "수원센터",
    equipment: "VOLT METER",
    extra: "",
  },
  {
    id: 8,
    date: "2025. 06. 30 21:20",
    filename: "20250619_095012",
    status: "오류",
    category: "전기설비",
    location: "대구지사",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 9,
    date: "2025. 06. 29 22:20",
    filename: "20250618_083003",
    status: "정상",
    category: "기계설비",
    location: "포항지사",
    equipment: "VALVE",
    extra: "",
  },
  {
    id: 10,
    date: "2025. 06. 28 23:20",
    filename: "20250617_072000",
    status: "정상",
    category: "계측기기",
    location: "창원센터",
    equipment: "AMP SENSOR",
    extra: "",
  },
  {
    id: 1,
    date: "2025. 07. 07 14:20",
    filename: "20250626_150519",
    status: "정상",
    category: "전기설비",
    location: "울산UGPS",
    equipment: "TIE ACB",
    extra: "",
  },
  {
    id: 2,
    date: "2025. 07. 06 14:24",
    filename: "20250625_140312",
    status: "오류",
    category: "전기설비",
    location: "부산항만",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 3,
    date: "2025. 07. 05 15:20",
    filename: "20250624_130133",
    status: "정상",
    category: "기계설비",
    location: "서울지사",
    equipment: "PUMP 01",
    extra: "",
  },
  {
    id: 4,
    date: "2025. 07. 04 16:20",
    filename: "20250623_120908",
    status: "정상",
    category: "계측기기",
    location: "대전본부",
    equipment: "TEMP SENSOR",
    extra: "",
  },
  {
    id: 5,
    date: "2025. 07. 03 17:20",
    filename: "20250622_115011",
    status: "오류",
    category: "전기설비",
    location: "광주센터",
    equipment: "TIE BKR",
    extra: "",
  },
  {
    id: 6,
    date: "2025. 07. 02 17:20",
    filename: "20250621_110430",
    status: "정상",
    category: "기계설비",
    location: "인천지사",
    equipment: "FAN MOTOR",
    extra: "",
  },
  {
    id: 7,
    date: "2025. 07. 01 20:20",
    filename: "20250620_104501",
    status: "정상",
    category: "계측기기",
    location: "수원센터",
    equipment: "VOLT METER",
    extra: "",
  },
  {
    id: 8,
    date: "2025. 06. 30 21:20",
    filename: "20250619_095012",
    status: "오류",
    category: "전기설비",
    location: "대구지사",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 9,
    date: "2025. 06. 29 22:20",
    filename: "20250618_083003",
    status: "정상",
    category: "기계설비",
    location: "포항지사",
    equipment: "VALVE",
    extra: "",
  },
  {
    id: 10,
    date: "2025. 06. 28 23:20",
    filename: "20250617_072000",
    status: "정상",
    category: "계측기기",
    location: "창원센터",
    equipment: "AMP SENSOR",
    extra: "",
  },
  {
    id: 1,
    date: "2025. 07. 07 14:20",
    filename: "20250626_150519",
    status: "정상",
    category: "전기설비",
    location: "울산UGPS",
    equipment: "TIE ACB",
    extra: "",
  },
  {
    id: 2,
    date: "2025. 07. 06 14:24",
    filename: "20250625_140312",
    status: "오류",
    category: "전기설비",
    location: "부산항만",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 3,
    date: "2025. 07. 05 15:20",
    filename: "20250624_130133",
    status: "정상",
    category: "기계설비",
    location: "서울지사",
    equipment: "PUMP 01",
    extra: "",
  },
  {
    id: 4,
    date: "2025. 07. 04 16:20",
    filename: "20250623_120908",
    status: "정상",
    category: "계측기기",
    location: "대전본부",
    equipment: "TEMP SENSOR",
    extra: "",
  },
  {
    id: 5,
    date: "2025. 07. 03 17:20",
    filename: "20250622_115011",
    status: "오류",
    category: "전기설비",
    location: "광주센터",
    equipment: "TIE BKR",
    extra: "",
  },
  {
    id: 6,
    date: "2025. 07. 02 17:20",
    filename: "20250621_110430",
    status: "정상",
    category: "기계설비",
    location: "인천지사",
    equipment: "FAN MOTOR",
    extra: "",
  },
  {
    id: 7,
    date: "2025. 07. 01 20:20",
    filename: "20250620_104501",
    status: "정상",
    category: "계측기기",
    location: "수원센터",
    equipment: "VOLT METER",
    extra: "",
  },
  {
    id: 8,
    date: "2025. 06. 30 21:20",
    filename: "20250619_095012",
    status: "오류",
    category: "전기설비",
    location: "대구지사",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 9,
    date: "2025. 06. 29 22:20",
    filename: "20250618_083003",
    status: "정상",
    category: "기계설비",
    location: "포항지사",
    equipment: "VALVE",
    extra: "",
  },
  {
    id: 10,
    date: "2025. 06. 28 23:20",
    filename: "20250617_072000",
    status: "정상",
    category: "계측기기",
    location: "창원센터",
    equipment: "AMP SENSOR",
    extra: "",
  },
  {
    id: 1,
    date: "2025. 07. 07 14:20",
    filename: "20250626_150519",
    status: "정상",
    category: "전기설비",
    location: "울산UGPS",
    equipment: "TIE ACB",
    extra: "",
  },
  {
    id: 2,
    date: "2025. 07. 06 14:24",
    filename: "20250625_140312",
    status: "오류",
    category: "전기설비",
    location: "부산항만",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 3,
    date: "2025. 07. 05 15:20",
    filename: "20250624_130133",
    status: "정상",
    category: "기계설비",
    location: "서울지사",
    equipment: "PUMP 01",
    extra: "",
  },
  {
    id: 4,
    date: "2025. 07. 04 16:20",
    filename: "20250623_120908",
    status: "정상",
    category: "계측기기",
    location: "대전본부",
    equipment: "TEMP SENSOR",
    extra: "",
  },
  {
    id: 5,
    date: "2025. 07. 03 17:20",
    filename: "20250622_115011",
    status: "오류",
    category: "전기설비",
    location: "광주센터",
    equipment: "TIE BKR",
    extra: "",
  },
  {
    id: 6,
    date: "2025. 07. 02 17:20",
    filename: "20250621_110430",
    status: "정상",
    category: "기계설비",
    location: "인천지사",
    equipment: "FAN MOTOR",
    extra: "",
  },
  {
    id: 7,
    date: "2025. 07. 01 20:20",
    filename: "20250620_104501",
    status: "정상",
    category: "계측기기",
    location: "수원센터",
    equipment: "VOLT METER",
    extra: "",
  },
  {
    id: 8,
    date: "2025. 06. 30 21:20",
    filename: "20250619_095012",
    status: "오류",
    category: "전기설비",
    location: "대구지사",
    equipment: "MAIN ACB",
    extra: "",
  },
  {
    id: 9,
    date: "2025. 06. 29 22:20",
    filename: "20250618_083003",
    status: "정상",
    category: "기계설비",
    location: "포항지사",
    equipment: "VALVE",
    extra: "",
  },
  {
    id: 10,
    date: "2025. 06. 28 23:20",
    filename: "20250617_072000",
    status: "정상",
    category: "계측기기",
    location: "창원센터",
    equipment: "AMP SENSOR",
    extra: "",
  },
];
