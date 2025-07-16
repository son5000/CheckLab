export async function postUserLogin(email, password) {
  const backUrl = process.env.REACT_APP_BACKEND_URL;
  try {
    const res = await fetch(`${backUrl}user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(`요청 실패: ${error}`);
    alert("서버 요청 중 오류가 발생했습니다.");
    return null;
  }
}
