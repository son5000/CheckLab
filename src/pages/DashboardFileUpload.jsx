import useFileUpload from "../lib/login/useFileUpload";

export default function DashboardFileUpload() {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();

  return (
    <section className="fileUpload content">
      <h2>Upload Files</h2>
      <p>Easily upload files and preview them right away</p>
      <div>
        <InputFile setUploadedFiles={setUploadedFiles} />
        <UploadedFileList
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>
    </section>
  );
}

export function InputFile({ setUploadedFiles }) {
  const handleChangeInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const udFiles = selectedFiles.filter((file) =>
      file.name.toLowerCase().endsWith(".ud")
    );
    setUploadedFiles((prev) => [...prev, ...udFiles]);
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
        <mark type="button">Browse Files</mark>
      </label>
    </form>
  );
}

export function UploadedFileList({ uploadedFiles, setUploadedFiles }) {
  const handleClickFileRemove = (fileName) => {
    let temp = [...uploadedFiles];
    const newUploadedFiles = temp.filter((i) => i.name !== fileName);
    setUploadedFiles(newUploadedFiles);
  };

  return (
    <div className="uploadedFileListBox">
      <h3>File List</h3>
      {uploadedFiles[0] ? (
        <div>
          <button>SAVE</button>
        </div>
      ) : (
        ""
      )}
      <ul>
        {uploadedFiles.map((file, idx) => (
          <li key={idx}>
            {file.name}{" "}
            <button>
              <span>thumbnail</span>
            </button>
            <button onClick={() => handleClickFileRemove(file.name)}>
              <span>cancel</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
