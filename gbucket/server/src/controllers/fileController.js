const fileRepository = require('../repositories/fileRepository');
const { logger } = require('../utilities/logger.util');
const fs = require('fs').promises;
const { fileTypeFromBuffer } = require('file-type');
const path = require('path');
const { randomUUID } = require('crypto');

exports.createFile = async (req, res) => {
  try {
    const uploadedFile = req.file;
    const { file: base64String, fileName, ...otherBody } = req.body;

    let fileBuffer;
    let originalName;
    const uniqueId = randomUUID(); // Standard UUID v4 generation

    // Case 1: Multer uploaded file
    if (uploadedFile) {
      logger.info(`Received file upload: ${uploadedFile.originalname}, size: ${uploadedFile.size} bytes`);
      fileBuffer = await fs.readFile(uploadedFile.path);

      // Extract original extension or fallback to empty string
      const fileExt = path.extname(uploadedFile.originalname);
      originalName = `${uniqueId}${fileExt}`;

      // Clean up the temp file created by Multer
      await fs.unlink(uploadedFile.path);
    }
    // Case 2: Base64 string sent in body
    else if (base64String) {
      logger.info(`Received base64 upload for file: ${fileName || 'unnamed_file'}`);

      let detectedExt = null;

      // Method A: Check for Data URL prefix (e.g., "data:image/png;base64,...")
      if (base64String.includes(',')) {
        const matches = base64String.match(/^data:([a-zA-Z0-9-]+\/[a-zA-Z0-9-+.]+);base64,/);
        if (matches && matches[1]) {
          const mimeType = matches[1];
          detectedExt = mimeType.split('/')[1]?.split('+')[0];
        }
      }

      // Extract raw base64 data payload
      const base64Data = base64String.includes(',')
        ? base64String.split(',')[1]
        : base64String;

      // Convert Base64 string to Buffer
      fileBuffer = Buffer.from(base64Data, 'base64');

      // Method B: Fallback to magic numbers inspection if Data URL didn't specify extension
      if (!detectedExt) {
        const fileTypeResult = await fileTypeFromBuffer(fileBuffer);
        if (fileTypeResult) {
          detectedExt = fileTypeResult.ext;
        }
      }

      // Method C: If fileName was manually provided with an extension, extract that as a fallback
      if (!detectedExt && fileName && path.extname(fileName)) {
        detectedExt = path.extname(fileName).replace('.', '');
      }

      // Build originalName with UUID + extension
      originalName = detectedExt
        ? `${uniqueId}.${detectedExt}`
        : uniqueId;
    }
    // Neither was provided
    else {
      return res.status(400).json({ error: 'No file or base64 data uploaded' });
    }

    // Pass Buffer and metadata to repository
    const result = await fileRepository.createWithPublicFile(
      originalName,
      fileBuffer,
      uploadedFile ? req.body : otherBody
    );

    // Send success response
    return res.status(201).json(result);

  } catch (error) {
    logger.error("Upload error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await fileRepository.findAll();
    return res.status(200).json({ status: true, data: files });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
    const file = await fileRepository.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ status: false, message: 'File not found' });
    }
    return res.status(200).json({ status: true, data: file });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const updatedFile = await fileRepository.update(req.params.id, req.body);
    if (!updatedFile) {
      return res.status(404).json({ status: false, message: 'File not found' });
    }
    return res.status(200).json({ status: true, data: updatedFile });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const deleted = await fileRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'File not found' });
    }
    return res.status(200).json({ status: true, message: 'File record deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};