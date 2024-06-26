import axios from "axios";
import requestData from "./data.json";

const MULTIPART_FORM_DATA = "multipart/form-data";

export const uploadPdf = async () => {
  try {
    const data = new FormData();

    data.append("eAppNo", requestData.eAppNo);
    data.append("AgentNo", requestData.agentNo);
    data.append("AgentFullName", requestData.agentFullName);
    data.append("Type", requestData.type);
    // requestData.files.forEach((file, index) => {
    //   const convertedFile = base64toFile(
    //     `data:application/pdf;base64,${file.base64String}`,
    //     `${file.fileName}.pdf`
    //   );
    //   data.append(`files[${index}].FileType`, file.fileType);
    //   data.append(`files[${index}].FileName`, "");
    //   data.append(`files[${index}].File`, convertedFile);
    // });

    const res = axios.post("api/fileUpload", data, {
      headers: {
        "Content-Type": MULTIPART_FORM_DATA,
      },
    });
  } catch (error) {
    console.log("🚀 ~ uploadPdf ~ error:", error);
  }
};

function base64toFile(base64String, fileName) {
  const parts = base64String.split(";base64,");
  const mimeType = parts[0].split(":")[1];
  const base64Data = parts[1];

  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });

  const file = new File([blob], fileName, { type: mimeType });

  return file;
}
