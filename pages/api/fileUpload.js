// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export default async function handler(req, res) {
  // // need to get request (Please convert request to pdf file in here)

  console.log(req.body);

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
