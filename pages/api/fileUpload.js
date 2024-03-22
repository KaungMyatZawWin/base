// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from "multer";
import { IncomingForm } from "formidable";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // // need to get request (Please convert request to pdf file in here)

  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error parsing form data" });
      return;
    }

    // Handle form data
    console.log(fields);
    console.log(files);

    // Respond accordingly
    res.status(200).json({ message: "Form data received successfully" });
  });

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
