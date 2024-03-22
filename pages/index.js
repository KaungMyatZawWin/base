import { uploadPdf } from "../services/fileApi.service";

export default function Home() {
  const handleClick = async () => {
    await uploadPdf();
  };
  return (
    <div>
      <button onClick={handleClick}>Send</button>
    </div>
  );
}
