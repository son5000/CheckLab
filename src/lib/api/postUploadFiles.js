// ____________업로드 파일 백엔드 송신부 API____________
export function postUploadFiles(file) {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return fetch(`${backendUrl}/fileUpload`, {
    method: "POST",
    body: JSON.stringify(file),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("업로드 실패");
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("업로드 중 오류가 발생했습니다.", error);
      throw error;
    });
}
