const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: './public/files',
    filename: function (req, file, fn) {
        fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 200000 },
}).single('file');
module.exports = upload;