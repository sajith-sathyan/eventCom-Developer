
var admin = require("firebase-admin");

var serviceAccount = require("./evevtcom-firebase-adminsdk-j0fnh-3d9cec3e1e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin