"use strict";

const fs = require("fs");
const path = require("path");
const selfsigned = require("selfsigned");

const generateSelfSignedSSL = async () => {
    try {
        const attrs = [{ name: "commonName", value: "localhost" }];
        const pems = selfsigned.generate(attrs, { days: 365 });
        const privateKey = path.join(__dirname, "keys/");
        const certificatePath = path.join(__dirname, "keys/");
        if (!fs.existsSync(privateKey)) {
            fs.mkdirSync(privateKey, { recursive: true });
        }
        fs.writeFileSync(`${privateKey}localhost.key`, pems.private);
        if (!fs.existsSync(certificatePath)) {
            fs.mkdirSync(certificatePath, { recursive: true });
        }
        fs.writeFileSync(`${certificatePath}localhost.crt`, pems.cert);

        return true;
    } catch (error) {
        return false;
    }
};

const getSSLConfig = () => {
    const { SSL_KEY_PATH, SSL_CERT_PATH } = process.env;
    const SSL_KEY = path.join(__dirname, "keys/localhost.key");
    const SSL_CERT = path.join(__dirname, "keys/localhost.crt");
    // if (fs.existsSync(path.join(FILE_STORAGE_PATH, "server-config/ssl/localhost.key"))) {
    //     SSL_KEY = path.join(FILE_STORAGE_PATH, "server-config/ssl/localhost.key");
    // }
    // if (fs.existsSync(path.join(FILE_STORAGE_PATH, "server-config/ssl/localhost.crt"))) {
    //     SSL_CERT = path.join(FILE_STORAGE_PATH, "server-config/ssl/localhost.crt");
    // }
    return {
        keyPath: SSL_KEY_PATH || SSL_KEY,
        certPath: SSL_CERT_PATH || SSL_CERT
    };
};

module.exports = {
    generateSelfSignedSSL,
    getSSLConfig
};
