// import express from 'express';
// import multer from 'multer';

// const uploadPdfRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './files');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });
// // require("./pdfDetails");
// // const pdf = mongoose.model("PdfDetails");
// const uploadPdf = multer({ storage: storage });

// uploadPdfRouter.post(
//   '/upload-files',
//   uploadPdf.single('file'),
//   async (req, res) => {
//     console.log(req.file);
//     const title = req.body.title;
//     const fileName = req.file.filename;
//     try {
//       await pdf.create({ title: title, pdf: fileName });
//       res.send({ status: 'ok' });
//     } catch (error) {
//       res.json({ status: error });
//     }
//   }
// );

// uploadPdfRouter.get('/get-files', async (req, res) => {
//   try {
//     pdf.find({}).then((data) => {
//       res.send({ status: 'ok', data: data });
//     });
//   } catch (error) {}
// });

// export default uploadPdfRouter;
