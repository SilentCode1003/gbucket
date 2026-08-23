/**
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 */

/**
 * @typedef {Object} FileCols
 * @property {'f_id'} id
 * @property {'f_file_type'} file_type
 * @property {'f_path'} path
 * @property {'f_url'} url
 * @property {'f_web_service'} web_service
 * @property {'f_upload_at'} upload_at
 */

const File = {
  File: {
    table: 'file',
    pk: 'f_id',
    prefix: 'f',
    /** @type {FileCols} */
    cols: {
      id: 'f_id',
      file_type: 'f_file_type',
      path: 'f_path',
      url: 'f_url',
      web_service: 'f_web_service',
      upload_at: 'f_upload_at',
    },
    select: ['f_id', 'f_file_type', 'f_path', 'f_url', 'f_web_service', 'f_upload_at'],
    insert: ['f_id', 'f_file_type', 'f_path', 'f_url', 'f_web_service'],
  },
};

exports.File = File;