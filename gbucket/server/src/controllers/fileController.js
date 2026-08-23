const fileRepository = require('../repositories/fileRepository');
const { logger } = require('../utilities/logger.util');
const fs = require('fs').promises;

exports.createFile = async (req, res) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // 3. Read the file into a buffer
    const fileBuffer = await fs.readFile(uploadedFile.path);

    // 4. Pass EVERYTHING to your repository method
    const result = await fileRepository.createWithPublicFile(
      uploadedFile.originalname,
      fileBuffer,
      req.body
    );

    // 5. Clean up the temp file created by Multer
    await fs.unlink(uploadedFile.path);

    // 6. Send success response back to TanStack router
    res.status(201).json(result);

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
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