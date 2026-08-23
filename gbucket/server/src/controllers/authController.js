const { EncryptString } = require('../utilities/cryptography.util');
const jwt = require('jsonwebtoken');
const masterUserRepository = require('../repositories/masterUserRepository');
const { logger } = require('../utilities/logger.util');

// Secret key for JWT (Store this in your .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1d'; // Token validity duration

exports.login = async (req, res) => {
  try {
    const { mu_username, mu_password } = req.body;

    // 1. Validate request body
    if (!mu_username || !mu_password) {
      return res.status(400).json({
        status: false,
        message: 'Username and password are required.'
      });
    }

    // 2. Find user by username
    const user = await masterUserRepository.findByUsername(mu_username);
    logger.info(`User ${user} found. Proceeding with password verification.`);
    logger.info(`User ${user.mu_password} stored password hash.`);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password.'
      });
    }

    // 3. Check if user account is active
    if (user.mu_is_active !== 'active') {
      return res.status(403).json({
        status: false,
        message: 'Your account is inactive. Please contact system administrator.'
      });
    }


    logger.info(`User ${mu_username} found. Proceeding with password verification.`);
    logger.info(`User ${user.mu_password} stored password hash.`);
    // 4. Verify password
    const isPasswordValid = EncryptString(mu_password) === user.mu_password;

    if (!isPasswordValid) {
      logger.warn(`User ${mu_username} provided incorrect password.`);
      return res.status(401).json({
        status: false,
        message: 'Invalid username or password.'
      });
    }

    // 5. Generate JWT Token
    const payload = {
      mu_id: user.mu_id,
      mu_username: user.mu_username,
      mu_fullname: user.mu_fullname,
      mu_role: user.mu_role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // 6. Return response (Excluding password from returned user object)
    const userResponse = {
      mu_id: user.mu_id,
      mu_fullname: user.mu_fullname,
      mu_username: user.mu_username,
      mu_role: user.mu_role,
      mu_is_active: user.mu_is_active,
      mu_create_at: user.mu_create_at
    };

    return res.status(200).json({
      status: true,
      message: 'Login successful.',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};