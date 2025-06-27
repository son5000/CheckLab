import { useEffect, useState } from "react";

export default function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sendFiles, setSendFiles] = useState(false);

  return { uploadedFiles, setUploadedFiles };
}
