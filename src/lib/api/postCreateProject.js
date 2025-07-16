export async function PostCreateProject(form) {
  const backUrl = process.env.REACT_APP_BACKEND_URL;

  const hasEmptyField = Object.values(form).some((value) => {
    if (typeof value !== "string") return !value;
    return value.trim() === "";
  });

  if (hasEmptyField) {
    return { success: false, message: "모든 항목의 값을 입력해주세요." };
  }

  try {
    const res = await fetch(`${backUrl}project/create_project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      return { success: false, message: "프로젝트 생성에 실패했습니다." };
    }
    const data = await res.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.error(`요청 실패: ${error}`);
    return { success: false, message: "서버 요청 중 오류가 발생했습니다." };
  }
}
