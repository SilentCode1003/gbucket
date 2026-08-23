/**
 * ⚠️ AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 */

/**
 * @typedef {Object} RoleCols
 * @property {'mr_id'} id
 * @property {'mr_name'} name
 * @property {'mr_create_at'} create_at
 * @property {'mr_create_by'} create_by
 */

/**
 * @typedef {Object} RouteCols
 * @property {'mr_id'} id
 * @property {'mr_route'} route
 * @property {'mr_route_name'} route_name
 * @property {'mr_create_at'} create_at
 * @property {'mr_create_by'} create_by
 */

/**
 * @typedef {Object} UserCols
 * @property {'mu_id'} id
 * @property {'mu_fullname'} fullname
 * @property {'mu_username'} username
 * @property {'mu_password'} password
 * @property {'mu_role'} role
 * @property {'mu_is_active'} is_active
 * @property {'mu_create_at'} create_at
 * @property {'mu_create_by'} create_by
 */

/**
 * @typedef {Object} TokenCols
 * @property {'mt_id'} id
 * @property {'mt_web_service'} web_service
 * @property {'mt_token'} token
 */

const Master = {
  Role: {
    table: 'master_role',
    pk: 'mr_id',
    prefix: 'mr',
    /** @type {RoleCols} */
    cols: {
      id: 'mr_id',
      name: 'mr_name',
      create_at: 'mr_create_at',
      create_by: 'mr_create_by',
    },
    select: ['mr_id', 'mr_name', 'mr_create_at', 'mr_create_by'],
    insert: ['mr_name', 'mr_create_by'],
  },
  Route: {
    table: 'master_route',
    pk: 'mr_id',
    prefix: 'mr',
    /** @type {RouteCols} */
    cols: {
      id: 'mr_id',
      route: 'mr_route',
      route_name: 'mr_route_name',
      create_at: 'mr_create_at',
      create_by: 'mr_create_by',
    },
    select: ['mr_id', 'mr_route', 'mr_route_name', 'mr_create_at', 'mr_create_by'],
    insert: ['mr_route', 'mr_route_name', 'mr_create_by'],
  },
  User: {
    table: 'master_user',
    pk: 'mu_id',
    prefix: 'mu',
    /** @type {UserCols} */
    cols: {
      id: 'mu_id',
      fullname: 'mu_fullname',
      username: 'mu_username',
      password: 'mu_password',
      role: 'mu_role',
      is_active: 'mu_is_active',
      create_at: 'mu_create_at',
      create_by: 'mu_create_by',
    },
    select: ['mu_id', 'mu_fullname', 'mu_username', 'mu_password', 'mu_role', 'mu_is_active', 'mu_create_at', 'mu_create_by'],
    insert: ['mu_id', 'mu_fullname', 'mu_username', 'mu_password', 'mu_role', 'mu_is_active', 'mu_create_by'],
  },
  Token: {
    table: 'master_token',
    pk: 'mt_id',
    prefix: 'mt',
    /** @type {TokenCols} */
    cols: {
      id: 'mt_id',
      web_service: 'mt_web_service',
      token: 'mt_token',
    },
    select: ['mt_id', 'mt_web_service', 'mt_token'],
    insert: ['mt_web_service', 'mt_token'],
  },
};

exports.Master = Master;