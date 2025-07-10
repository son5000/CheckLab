import { useEffect, useState } from "react";
import JSZip from "jszip";

// _________사용자 업로드 파일 압축 해제 썸네일 추출 __________
export default function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    if (!uploadedFiles || Object.keys(uploadedFiles).length < 1) return;

    const createThumbnail = async () => {
      const result = [];

      for (const [clearFileName, { file }] of Object.entries(uploadedFiles)) {
        try {
          const jszip = new JSZip();
          const zip = await jszip.loadAsync(file);

          for (const entry of Object.values(zip.files)) {
            const fileName = entry.name.split("/").pop();
            const isImage = /\.(jpg|jpeg|png)$/i.test(fileName);
            const hasV = fileName.includes("V");

            if (isImage && hasV && !entry.dir) {
              const blob = await entry.async("blob");
              const url = URL.createObjectURL(blob);

              result.push({
                name: clearFileName,
                url,
              });
            }
          }
        } catch (err) {
          console.error(`썸네일 생성 실패 (${clearFileName}):`, err);
        }
      }

      setThumbnails(result);
    };

    createThumbnail();
  }, [uploadedFiles]);

  return { uploadedFiles, setUploadedFiles, thumbnails };
}
