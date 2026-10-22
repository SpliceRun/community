// Minimal Node-RED settings for this example. Provided as-is, without warranty.
// Everything not set here uses Node-RED's defaults.
//
// It turns on the editor / admin API login (Node-RED has none by default) using
// a user name and password taken from environment variables, and encrypts the
// stored flow credentials with a secret from the environment.
const crypto = require("crypto");

const adminUser = process.env.NODE_RED_ADMIN_USER || "admin";
const adminPassword = process.env.NODE_RED_ADMIN_PASSWORD || "";
const credentialSecret = process.env.NODE_RED_CREDENTIAL_SECRET || "";

if (!adminPassword || !credentialSecret) {
    throw new Error("NODE_RED_ADMIN_PASSWORD and NODE_RED_CREDENTIAL_SECRET must be set");
}

// Compare fixed-length digests so the check does not depend on input length.
function sameText(a, b) {
    const ha = crypto.createHash("sha256").update(String(a)).digest();
    const hb = crypto.createHash("sha256").update(String(b)).digest();
    return crypto.timingSafeEqual(ha, hb);
}

module.exports = {
    flowFile: "flows.json",
    credentialSecret: credentialSecret,

    adminAuth: {
        type: "credentials",
        users: function (username) {
            if (sameText(username, adminUser)) {
                return Promise.resolve({ username: adminUser, permissions: "*" });
            }
            return Promise.resolve(null);
        },
        authenticate: function (username, password) {
            if (sameText(username, adminUser) && sameText(password, adminPassword)) {
                return Promise.resolve({ username: adminUser, permissions: "*" });
            }
            return Promise.resolve(null);
        },
    },

    uiPort: process.env.PORT || 1880,

    logging: {
        console: { level: "info", metrics: false, audit: false },
    },

    editorTheme: {
        projects: { enabled: false },
    },
};
