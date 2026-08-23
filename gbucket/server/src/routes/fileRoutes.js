const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../controllers/fileController');

const upload = multer({ dest: 'public/uploads/' });

router.post('/', upload.single('file'), fileController.createFile);

// router.post('/', fileController.createFile);
router.get('/', fileController.getAllFiles);
router.get('/:id', fileController.getFileById);
router.put('/:id', fileController.updateFile);
router.delete('/:id', fileController.deleteFile);

module.exports = router;