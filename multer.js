

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // stores files
module.exports = upload;
