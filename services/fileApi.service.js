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
    requestData.files.forEach((file, index) => {
      const convertedFile = base64toFile(
        `data:application/pdf;base64,${file.base64String}`,
        `${file.fileName}.pdf`
      );
      const convertedBlob = b64toBlob(file.base64String)
      // const bf = Buffer.from(file.base64String)
      data.append(`files[${index}].FileType`, file.fileType);
      data.append(`files[${index}].FileName`, file.fileName);
      data.append(`files[${index}].File`, convertedFile);
      // data.append(`files[${index}].File`, bf);
    });

    const res = axios.post("api/fileUpload", data, {
      headers: {
        "Content-Type": MULTIPART_FORM_DATA,
      },
    });
  } catch (error) {
    console.log("🚀 ~ uploadPdf ~ error:", error);
  }
};

export function base64toFile(base64String, fileName) {
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

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}