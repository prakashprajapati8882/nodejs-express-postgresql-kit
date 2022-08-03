const helmet = require("helmet");

module.exports = [
    helmet.frameguard({
        action: "SAMEORIGIN"
    }),
    helmet.contentSecurityPolicy({
        useDefaults: false,
        directives: {
            "default-src":
            helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
            "frame-ancestors": ["'self'"]
        }
    })
];
