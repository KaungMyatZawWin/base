// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from "multer";
import formidable from "formidable";
import fs from "fs";

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

  const promises = Object.values(files).flatMap(fileArray =>
    fileArray.map(file =>
      new Promise((resolve, reject) => {
        fs.readFile(file.filepath, (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            reject(err);
            return;
          }
          const base64String = Buffer.from(data).toString("base64");
          base64Data.push(base64String);
          resolve();
        });
      })
    )
  );
  
  await Promise.all(promises);
  
  console.log("checking base64 data ...", base64Data);
  
  // console.log("checking base64 data ...",base64Data);

  // const fileObject = files['files[0].File'];
  // console.log('checking...', req.body);

  // upload.single("file")(req, res, function (err) {
  //   if (err instanceof multer.MulterError) {
  //     // A Multer error occurred when uploading.
  //     return res.status(500).json({ error: err.message });
  //   } else if (err) {
  //     // An unknown error occurred when uploading.
  //     return res.status(500).json({ error: "An unknown error occurred." });
  //   }

  //   // File uploaded successfully. You can access the file details via req.file.
  //   // Additional form data is available in req.body
  //   const { filename, path } = req.file;
  //   const { name, description } = req.body; // Access additional form data
  //   return res.status(200).json({ filename, path, name, description });
  // });
  res.status(200).json({ name: "John Doe" });
}
