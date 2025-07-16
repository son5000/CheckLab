// import { useEffect, useState } from "react";
// import JSZip from "jszip";

// export default function useFileUpload() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [thumbnails, setThumbnails] = useState([]);

//   useEffect(() => {
//     if (!uploadedFiles || Object.keys(uploadedFiles).length < 1) return;

//     const createThumbnail = async () => {
//       const result = [];

//       for (const [clearFileName, { file }] of Object.entries(uploadedFiles)) {
//         try {
//           const jszip = new JSZip();
//           const zip = await jszip.loadAsync(file);

//           const fileCount = Object.keys(zip.files).length;

//           if (fileCount >= 5) {
//             for (const entry of Object.values(zip.files)) {
//               const fileName = entry.name.split("/").pop();

//               const hasV = fileName.includes("V");

//               if (hasV && fileCount >= 5) {
//                 const blob = await entry.async("blob");
//                 const url = URL.createObjectURL(blob);

//                 result.push({
//                   name: clearFileName,
//                   url,
//                   type: "image",
//                 });
//               }
//             }
//           } else if (fileCount === 3) {
//             result.push({
//               name: clearFileName,
//               url: null,
//               type: "video",
//             });
//           }
//         } catch (err) {
//           console.error(`썸네일 생성 실패 (${clearFileName}):`, err);
//         }
//       }

//       setThumbnails(result);
//     };

//     createThumbnail();
//   }, [uploadedFiles]);

//   return { uploadedFiles, setUploadedFiles, thumbnails };
// }

import { useState, useEffect } from "react";
import JSZip from "jszip";

export function useFileUpload(backUrl, userUploadHash) {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    if (!uploadedFiles || Object.keys(uploadedFiles).length === 0) return;

    const run = async () => {
      const newThumbnails = [];
      const videoUploadQueue = [];

      for (const [clearFileName, { file }] of Object.entries(uploadedFiles)) {
        const zip = await JSZip().loadAsync(file);
        const entries = Object.values(zip.files).filter((e) => !e.dir);
        const fileCount = entries.length;

        if (fileCount >= 5) {
          // ✅ 이미지 세트 ➜ 썸네일 추출
          for (const entry of entries) {
            const fileName = entry.name.split("/").pop();
            const hasV = fileName.includes("V");
            const isImage = /\.(jpg|jpeg|png)$/i.test(fileName);

            if (isImage && hasV) {
              const blob = await entry.async("blob");
              const url = URL.createObjectURL(blob);

              newThumbnails.push({
                name: clearFileName,
                url,
                type: "image",
              });
            }
          }
        } else if (fileCount === 3) {
          // ✅ 영상 ➜ avi만 추출하여 서버로 업로드
          let aviBlob = null;

          for (const entry of entries) {
            const fileName = entry.name.split("/").pop();
            const ext = fileName.split(".").pop().toLowerCase();

            if (ext === "avi") {
              aviBlob = await entry.async("blob");
            }
          }

          if (aviBlob) {
            videoUploadQueue.push({ name: clearFileName, avi: aviBlob });

            // 임시로 url: null 삽입
            newThumbnails.push({
              name: clearFileName,
              url: null,
              type: "video",
            });
          }
        }
      }

      setThumbnails(newThumbnails);

      // ✅ 서버에 avi만 전송
      for (const item of videoUploadQueue) {
        const formData = new FormData();
        formData.append("avi", item.avi, `${item.name}.avi`);
        formData.append("name", item.name);
        formData.append("uploadHash", userUploadHash);

        try {
          const res = await fetch(`${backUrl}video_upload`, {
            method: "POST",
            headers: {
              "X-Upload-Hash": userUploadHash,
            },
            body: formData,
            credentials: "include",
          });

          const data = await res.json();

          if (res.ok && data?.thumbnailUrl) {
            setThumbnails((prev) =>
              prev.map((thumb) =>
                thumb.name === item.name
                  ? { ...thumb, url: data.thumbnailUrl }
                  : thumb
              )
            );
          } else {
            console.error("썸네일 응답 오류", data);
          }
        } catch (err) {
          console.error("업로드 중 오류 발생", err);
        }
      }
    };

    run();
  }, [uploadedFiles, backUrl, userUploadHash]);

  return { uploadedFiles, setUploadedFiles, thumbnails };
}
