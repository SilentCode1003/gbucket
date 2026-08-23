/**
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 */

/**
 * @typedef {Object} LogsCols
 * @property {'sl_id'} id
 * @property {'sl_description'} description
 * @property {'sl_create_at'} create_at
 */

const System = {
  Logs: {
    table: 'system_logs',
    pk: 'sl_id',
    prefix: 'sl',
    /** @type {LogsCols} */
    cols: {
      id: 'sl_id',
      description: 'sl_description',
      create_at: 'sl_create_at',
    },
    select: ['sl_id', 'sl_description', 'sl_create_at'],
    insert: ['sl_id', 'sl_description'],
  },
};

exports.System = System;