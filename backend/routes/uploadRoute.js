import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { isAdmin, isAuth } from '../utils.js';
import mongoose from 'mongoose';

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  }
);

uploadRouter.post(
  '/profileImages',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.send(result);
  }
);

// Define a MongoDB schema and model (adjust as needed for your specific data structure)
const pdfSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});
const PdfModel = mongoose.model('Pdf', pdfSchema);

// Route to handle file upload
uploadRouter.post('/pdffiles', upload.single('pdf'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const newPdf = new PdfModel({
      name: originalname,
      data: buffer,
    });
    await newPdf.save();
    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get pdfs

uploadRouter.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await PdfModel.find();
    res.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default uploadRouter;
