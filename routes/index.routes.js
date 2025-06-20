const express = require('express')
const firebase = require('../config/firebase.config')
const router = express.Router();
const upload = require('../config/multer.config')

const fileModel = require('../models/file.models')
const authMiddleware = require('../middlewares/authe')


router.get('/home',authMiddleware,async(req,res)=>{


    const userFiles= await fileModel.find({
        user: req.user.userId 
    })

    res.render('home',{
        files:userFiles
    })
})
router.post('/upload',authMiddleware ,upload.single('file'), async (req,res) => {

        const newFile = await fileModel.create({
            path:req.file.path,
            orginalname: req.file.originalname,
            user:req.user.userId
            
        })

        res.json(newFile)


    console.log(req.file)
    res.send(req.file)
})


router.get('/download/:path',authMiddleware,async(req,res)=>{


    
    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUserId,
        path : path
    })

    if(!file){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }

    const signedUrl = await firebase.storage().bucket(),file(path).getSignedUrl({
            action : 'read',
            expires:Date.now()+ 60*1000
    })

    console.log(signedUrl)
    res.redirect(signedUrl[0])

})

module.exports=router;