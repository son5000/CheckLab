import { useLocation } from "react-router-dom";

export default function FileDetail() {
  // __________개별 데이터 수신 API 필요 ___________

  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  let cnt = segments[1] > 5 ? segments[1] - 5 : segments[1];

  console.log(cnt);

  return (
    <section className="fileDetail content">
      <h2>20250626_150519</h2>
      <p>
        Review the full report, metadata, and status of the selected file. Use
        this information for further validation or documentation.
      </p>
      <div>
        <img src={`/images/ult${cnt}.png`} alt="" />
        <div>
          <img src={`/images/gra${cnt}.png`} alt="" />
          <img src={`/images/spe${cnt}.png`} alt="" />
        </div>
      </div>
      <div>
        <div>
          <img src={`/images/the${cnt}.png`} alt="" />
          <img src={`/images/vio${cnt}.png`} alt="" />
        </div>
        <img src={`/images/rep${cnt}.png`} alt="" />
      </div>
    </section>
  );
}
