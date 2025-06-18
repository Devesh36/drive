const { credential } = require('firebase-admin');
const multer = require('multer');
const firebase = require('./firebase.config')
const firebaseStorage = require('multer-firebase-storage');
const serviceAccount = require('../')

const storage = firebaseStorage({
    credentials:FirebaseFirestore.credential.cert(serviceAccount),
    bucketName:'d',
    unique: true,
})


const upload = multer({
    storage: storage ,
})

module.exports = router ; 