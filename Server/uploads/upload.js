const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
require("dotenv").config();

// MongoDB bağlantısını yapılandırın
mongoose.connect(process.env.DBCONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GridFSStorage yapılandırmasını oluşturun
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Dosyaların yükleneceği klasörü belirtin
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Dosyanın orijinal adını kullanın veya istediğiniz başka bir adlandırma mantığı belirleyin
    },
  });

// Multer yapılandırmasını oluşturun
const upload = multer({ storage });

module.exports = upload;