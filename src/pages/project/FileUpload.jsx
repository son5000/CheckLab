import { useRef, useState } from "react";
import { useFileUpload } from "../../lib/hooks/useFileUpload";
import { postUploadFiles } from "../../lib/api/postUploadFiles";
import { useClickOutSide } from "../../lib/hooks/useClickOutside";
import YearSearchBox from "../../components/project/YearSearchBox";

// _________________fileUpload Content Container_________________
export default function FileUpload() {
  const [isCategorieSelect, setIsCategorieSelect] = useState("2025");
  const [isSelectProjectName, setIsSelctProjectName] = useState("");
  const { uploadedFiles, setUploadedFiles, thumbnails } = useFileUpload();
  return (
    <section className="fileUpload content">
      <h2>파일 업로드</h2>
      <p>Easily upload files and preview them right away</p>
      <div>
        <InputFile
          isSelectProjectName={isSelectProjectName}
          setUploadedFiles={setUploadedFiles}
        />
        <ProjectSeclectBox
          isSelectProjectName={isSelectProjectName}
          setIsSelctProjectName={setIsSelctProjectName}
          isCategorieSelect={isCategorieSelect}
          setIsCategorieSelect={setIsCategorieSelect}
        />
      </div>
      <UploadedFileList
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        thumbnails={thumbnails}
      />
    </section>
  );
}

// _________________파일 업로드 박스 파싱하고 저장_________________
// _________________Key : 파일명 (확장자X) _________________
// _________________value : file,groups _________________
export function InputFile({ setUploadedFiles, isSelectProjectName }) {
  const handleChangeInput = (e) => {
    if (!isSelectProjectName) {
      setUploadedFiles({});
      return alert("프로젝트를 선택해 주세요.");
    }
    const selectedFiles = Array.from(e.target.files);

    const udFiles = selectedFiles
      .filter((file) => file.name.toLowerCase().endsWith(".ud"))
      .reduce((acc, file) => {
        const clearFileName = file.name.slice(0, file.name.lastIndexOf("."));
        acc[clearFileName] = {
          file,
          groups: [null, null, null],
        };
        return acc;
      }, {});

    if (Object.keys(udFiles).length === 0) {
      alert("업로드는 .ud 파일 형식만 가능합니다.");
      setUploadedFiles({});
      return;
    }

    setUploadedFiles((prev) => ({
      ...prev,
      ...udFiles,
    }));
  };

  return (
    <form className="inputFileBox">
      <input
        onChange={handleChangeInput}
        type="file"
        accept=".ud"
        id="fileInput"
        multiple
      />
      <label htmlFor="fileInput">
        <img src="/images/upload_Icon.png" alt="" />
        <p>Drag and drop files here</p>
        <span>- OR -</span>
        <mark className="btn-bg-Blue" type="button">
          Browse Files
        </mark>
      </label>
    </form>
  );
}

export function ProjectSeclectBox({
  isCategorieSelect,
  setIsCategorieSelect,
  isSelectProjectName,
  setIsSelctProjectName,
}) {
  const values = [
    "울산UGPS",
    "국립호남권생물자원관",
    "체크가드㈜",
    "청수F&C",
    "SK 이노베이션",
    "제주 SK",
    "가스공사",
    "CheckGuard",
  ];

  return (
    <div className="projectSelectBox">
      <YearSearchBox
        isCategorieSelect={isCategorieSelect}
        setIsCategorieSelect={setIsCategorieSelect}
      />
      {isSelectProjectName ? (
        <p>{isSelectProjectName}</p>
      ) : (
        <p>업로드할 프로젝트를 먼저 선택해주세요.</p>
      )}
      <ul>
        {values.map((item, idx) => {
          return (
            <li key={idx} onClick={() => setIsSelctProjectName(item)}>
              <span className={isSelectProjectName === item ? "active" : ""}>
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
// _________________업로드 파일 목록_________________
// _________________썸네일(실화상 이미지) 팝업_________________
// _________________추가 설정 값 받아서 기존 객체에 값 추가_________________
// _________________groups["설비분류","장소","설비명"]_________________
export function UploadedFileList({
  uploadedFiles,
  setUploadedFiles,
  thumbnails,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState("");

  // _________________목록에서 선택 파일 제거_________________
  const handleClickFileRemove = (fileName) => {
    let temp = [...uploadedFiles];
    const newUploadedFiles = temp.filter((i) => i.name !== fileName);
    setUploadedFiles(newUploadedFiles);
    if (isPopupOpen) {
      setIsPopupOpen("");
    }
  };
  // _________________썸네일 ON, OFF_________________
  const handlePopupOpen = (url) => {
    setIsPopupOpen(url);
  };
  const handlePopupClose = () => {
    setIsPopupOpen("");
  };

  // _________________바깥 요소 클릭 감지 ______________
  const popupRef = useRef();
  useClickOutSide([popupRef], () => {
    handlePopupClose();
  });

  // _________________추가 설정 값 받아서 기존 객체에 값 추가_________________
  // _________________만약 동일 컬럼의 다중 셀 선택시 모든 선택 셀에 값 추가_________________
  const [selectedItems1, setSelectedItems1] = useState([]); //설비분류
  const [selectedItems2, setSelectedItems2] = useState([]); //장소
  const [selectedItems3, setSelectedItems3] = useState([]); //설비명
  const handleSettingGroup = (fileName, value, idx) => {
    const selectedItems =
      idx === 0
        ? selectedItems1
        : idx === 1
        ? selectedItems2
        : setSelectedItems3;

    setUploadedFiles((prev) => {
      const updated = { ...prev };

      if (selectedItems.includes(fileName)) {
        selectedItems.forEach((name) => {
          const fileData = updated[name];
          const currentGroup = [...fileData.groups];
          currentGroup[idx] = value;
          updated[name] = { ...fileData, groups: currentGroup };
        });
      } else {
        const fileData = updated[fileName];
        const currentGroup = fileData.groups;
        currentGroup[idx] = value;
        updated[fileName] = { ...fileData, groups: currentGroup };
      }
      return updated;
    });
  };

  // _________________셀 선택시 해당 셀 배열에 FILENAME 추가_________________
  const handleSelectedInputText = (fileName, idx) => {
    const selectedMap = [
      [setSelectedItems1],
      [setSelectedItems2],
      [setSelectedItems3],
    ];

    const [setSelectedItems] = selectedMap[idx];

    setSelectedItems((prev) => {
      if (prev.includes(fileName)) {
        return prev.filter((item) => item !== fileName);
      } else {
        return [...prev, fileName];
      }
    });
  };

  // _________________값 입력 후 엔터키 입력 시 셀 포커스 초기화_________________
  const handleKeyDown = (e, idx) => {
    if (e.key === "Enter") {
      const selectedMap = [
        [setSelectedItems1],
        [setSelectedItems2],
        [setSelectedItems3],
      ];
      const [setSelectedItems] = selectedMap[idx];
      setSelectedItems([]);
    }
  };

  return (
    <div className="uploadedFileListBox">
      {thumbnails[0] ? (
        <>
          <div>
            <h3>파일 목록</h3>
            <FileUploadBtn uploadedFiles={uploadedFiles} />
          </div>
          <p>각 필드에 해당하는 내용을 입력해 주세요.</p>
          <div className="toolBar">
            <span>파일명 (형식)</span>
            <span>설비구분</span>
            <span>장소</span>
            <span>설비명</span>
          </div>
        </>
      ) : (
        ""
      )}
      <ul>
        {thumbnails.map((file, idx) => (
          <li key={idx}>
            <p>
              {file.name}
              <span> ({file?.type === "image" ? "이미지" : "동영상"})</span>
            </p>
            <input
              type="text"
              onClick={() => handleSelectedInputText(file.name, 0)}
              className={selectedItems1.includes(file.name) ? "active1" : ""}
              onChange={(e) => handleSettingGroup(file.name, e.target.value, 0)}
              value={uploadedFiles[file.name]?.groups[0] ?? ""}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
            <input
              type="text"
              onClick={() => handleSelectedInputText(file.name, 1)}
              className={selectedItems2.includes(file.name) ? "active2" : ""}
              onChange={(e) => handleSettingGroup(file.name, e.target.value, 1)}
              value={uploadedFiles[file.name]?.groups[1] ?? ""}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />

            <input
              type="text"
              onClick={() => handleSelectedInputText(file.name, 2)}
              className={selectedItems3.includes(file.name) ? "active3" : ""}
              onChange={(e) => handleSettingGroup(file.name, e.target.value, 2)}
              value={uploadedFiles[file.name]?.groups[2] ?? ""}
              onKeyDown={(e) => handleKeyDown(e, 2)}
            />

            <button onClick={() => handlePopupOpen(file)}>
              <span>thumbnail</span>
            </button>
            <button onClick={() => handleClickFileRemove(`${file.name}.ud`)}>
              <span>cancel</span>
            </button>
            {isPopupOpen.url === file.url && (
              <div ref={popupRef}>
                <p>{isPopupOpen.name}</p>
                <img src={isPopupOpen?.url} alt="" />
                <button onClick={() => handlePopupClose()}>닫기</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───────── [업로드 파일] 백엔드 API로 제출하는 버튼 ─────────
export function FileUploadBtn(uploadedFiles) {
  const handleUpload = async () => {
    try {
      const result = await postUploadFiles(uploadedFiles);
      alert("업로드가 성공적으로 완료되었습니다.");
    } catch (error) {
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
      console.error("에러:", error.message);
    }
  };

  return (
    <button className="btn-bg-Blue" onClick={handleUpload}>
      저장하기
    </button>
  );
}
