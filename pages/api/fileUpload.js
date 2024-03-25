// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from "multer";
import formidable from "formidable";
import fs from "fs";
import { base64toFile } from "../../services/fileApi.service";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // // need to get request (Please convert request to pdf file in here)

  let base64Data = [];

  const form = formidable();

  const [fields, files] = await form.parse(req);

  // const fileObject = files['files[0].File'][0];
  // console.log(fields['files[0].FileType'][0]);

  let count = 0;

  const promises = Object.values(files).flatMap((fileArray) => {
    return fileArray.map(
      (file) =>
        new Promise((resolve, reject) => {
          fs.readFile(file.filepath, (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              reject(err);
              return;
            }
            const base64String = Buffer.from(data).toString("base64");
            base64Data.push({
              base64String: base64String,
              fileName: fields[`files[${count}].FileName`][0],
              fileType: fields[`files[${count}].FileType`][0],
            });
            count++;
            resolve();
          });
        })
    );
  });

  await Promise.all(promises);

  const eAppNO = fields["eAppNo"][0];
  const AgentNO = fields["AgentNo"][0];
  const AgentFullName = fields["AgentFullName"][0];
  const Type = fields["Type"][0];

  const data = new FormData();

  data.append("eAppNo", eAppNO);
  data.append("AgentNo", AgentNO);
  data.append("AgentFullName", AgentFullName);
  data.append("Type", Type);
  base64Data.forEach((file, index) => {
    const convertedFile = base64toFile(
      `data:application/pdf;base64,${file.base64String}`,
      `${file.fileName}.pdf`
    );
    data.append(`files[${index}].FileType`, file.fileType);
    data.append(`files[${index}].FileName`, file.fileName);
    data.append(`files[${index}].File`, convertedFile);
  });

  console.log( data);

  // const fileObject = files['files[0].File'];

  res.status(200).json({ name: "John Doe" });
}
