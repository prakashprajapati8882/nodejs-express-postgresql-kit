const crypto = require("crypto");

class Encryption {
    /**
     * Returns encrypted string.
     *
     * @since      1.0.0
     * @access     public
     *
     * @alias    comparePassword
     * @memberof EncryptionClass
     *
     * @return {string} encrypted string
     * @param {string} password to encrypt
     * @param {string} salt used to encrypt the password
    */
    static encryptPassword(password, usersalt) {
        return crypto.scryptSync(password, usersalt, 64, { N: 1024, r: 8, p: 16 }).toString("hex");
    }

    static makeUserSalt(length) {
        return crypto.randomBytes(length).toString("hex").slice(0, length);
    }
}

module.exports = {
    Encryption
};
