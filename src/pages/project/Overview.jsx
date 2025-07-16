import { useRef, useState, useEffect, use } from "react";
import { useClickOutSide } from "../../lib/hooks/useClickOutside";
import YearSearchBox from "../../components/project/YearSearchBox";
import DateInput from "../../components/project/DateInput";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/login/loginAuth";
import { PostCreateProject } from "../../lib/api/postCreateProject";
import { getProjectList } from "../../lib/api/getProjectList";
import { dateformat } from "../../lib/project/dateFormat";

// _________________Home Content Container _________________
export default function Overview() {
  const [isCategorieSelect, setIsCategorieSelect] = useState(2025);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef();
  const [projects, setProjects] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjectList(user?.id);
      setProjects(result);
    };

    fetchProjects(); // 호출
  }, [user]);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <section className="home content">
      <h2>프로젝트</h2>
      <div>
        <YearSearchBox
          setIsCategorieSelect={setIsCategorieSelect}
          isCategorieSelect={isCategorieSelect}
        />
        <button className="btn-bg-Blue" onClick={() => setIsPopupOpen(true)}>
          프로젝트 만들기
        </button>
      </div>
      {isPopupOpen && (
        <CreateProject
          user={user}
          popupRef={popupRef}
          handlePopupClose={handlePopupClose}
        />
      )}
      <p>
        <span>Projects / </span>
        <span>Project {isCategorieSelect}</span>
      </p>
      <ProjectList projects={projects} />
    </section>
  );
}

// _________________  프로젝트 생성 popup_________________
export function CreateProject({ handlePopupClose, popupRef, user }) {
  useClickOutSide([popupRef], () => {
    handlePopupClose();
  });

  const [form, setForm] = useState({
    project_name: "",
    contract_name: "",
    period_start: "",
    period_end: "",
    contractor: "",
    purpose: "",
    creator_id: "",
  });

  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({
        ...prev,
        creator_id: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleSummit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { success, message } = await PostCreateProject(form);

    alert(message);

    if (success) {
      handlePopupClose();
    }
  };

  return (
    <div className="createProject">
      <div ref={popupRef}>
        <div>
          <p>새 프로젝트</p>
          <button onClick={handlePopupClose} type="button">
            닫기
          </button>
        </div>
        <form onSubmit={(e) => handleSummit(e)}>
          <label htmlFor="project_name">프로젝트명</label>
          <input
            onChange={(e) => handleChange(e)}
            value={form.project_name}
            id="project_name"
            type="text"
            placeholder="프로젝트명을 입력해 주세요"
          />

          <label htmlFor="contract_name">용역명</label>
          <input
            onChange={(e) => handleChange(e)}
            value={form.contract_name}
            id="contract_name"
            type="text"
            placeholder="용역명을 입력해 주세요"
          />

          <label htmlFor="period_start">진단 기간</label>
          <div>
            <DateInput
              setForm={setForm}
              form={form}
              value={form.period_start}
              htmlFor={"period_start"}
            />
            <span> ~ </span>
            <DateInput
              setForm={setForm}
              form={form}
              value={form.period_end}
              htmlFor={"period_end"}
            />
          </div>
          <label htmlFor="contractor">용역업체명</label>
          <input
            onChange={(e) => handleChange(e)}
            value={form.contractor}
            id="contractor"
            type="text"
            placeholder="용역업체명을 입력해 주세요"
          />

          <label htmlFor="purpose">진단 목적</label>
          <textarea
            onChange={(e) => handleChange(e)}
            value={form.purpose}
            id="purpose"
            placeholder="진단 목적을 입력해 주세요"
          />
          <button className="btn-bg-Blue" type="submit">
            프로젝트 생성
          </button>
        </form>
      </div>
    </div>
  );
}

// _________________ project Table _________________
export function ProjectList({ projects }) {
  return (
    <table className="projectList">
      <thead>
        <tr>
          <th>생성일</th>
          <th>프로젝트명</th>
          <th>용역업체명</th>
          <th>진단 기간</th>
          <th>편집</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(projects) &&
          projects.map((item, idx) => {
            const formatted = {
              created: dateformat(item?.created_at).hasTimeDate,
              start: dateformat(item?.period_start).hasDayDate,
              end: dateformat(item?.period_end).hasDayDate,
            };

            return (
              <tr key={item?.id}>
                <td>{formatted.created}</td>
                <td>
                  <Link className="linkStyle_Blue" to={`/project/${idx}`}>
                    {item?.project_name}
                  </Link>
                </td>
                <td>{item?.contractor}</td>
                <td>{`${formatted.start} ~ ${formatted.end}`}</td>
                <td>
                  <button type="button">편집</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
