export async function getProjectList(userId) {
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  if (!userId) return null;

  try {
    const res = await fetch(
      `${backUrl}project/get_projectList?userId=${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("프로젝트 조회 실패");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ 프로젝트 목록 요청 실패:", err);
    return null;
  }
}
