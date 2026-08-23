const BaseRepository = require('./baseRepository');
const db = require('../models');
const fs = require('fs').promises;
const path = require('path');
const urlPath = process.env.GBUCKET_HOST;


class FileRepository extends BaseRepository {
  constructor() {
    super(db.File);
  }

  // Custom repository queries specific to File management
  async findByWebService(webService) {
    return await this.model.findAll({ where: { f_web_service: webService } });
  }

  async findByFileType(fileType) {
    return await this.model.findAll({ where: { f_file_type: fileType } });
  }

  /**
   * Saves a file to the public folder and creates a database record.
   * @param {string} fileName - The desired name of the file.
   * @param {Buffer|string} fileBuffer - The content of the file.
   * @param {Object} metadata - Additional database fields (f_web_service, f_file_type, etc.)
   * @returns {Promise<Object>} The created database record.
   */
  async createWithPublicFile(fileName, fileBuffer, metadata = {}) {
    try {
      // 1. Define the public folder path (adjust relative path as needed based on your project structure)
      const publicDir = path.join(__dirname, '../../public/uploads');

      // Ensure the directory exists
      await fs.mkdir(publicDir, { recursive: true });

      // 2. Create a unique or clean file path
      const filePath = path.join(publicDir, fileName);

      // 3. Write the file to the public folder
      await fs.writeFile(filePath, fileBuffer);

      // 4. Save the file metadata to the database using your base create method
      const dbRecord = await this.create({
        f_path: `/uploads/${fileName}`, // Store the relative URL path in DB
        f_url: `${urlPath}/uploads/${fileName}`,
        f_web_service: metadata.f_web_service,
        f_file_type: metadata.f_file_type,
        f_path: metadata.f_path,
      });

      return {
        message: 'success', data: {
          url: `${urlPath}/uploads/${fileName}`,
        }
      };
    } catch (error) {
      throw new Error(`Failed to save file: ${error.message}`);
    }
  }
}

module.exports = new FileRepository();