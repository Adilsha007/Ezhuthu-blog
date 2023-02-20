const express = require('express')
const  authJwt  = require("../middlewares/auth-jwt");
const controller = require("../controllers/user-controller");
const authController = require('../controllers/auth-controller')
const verifySignUp = require('../middlewares/verify-signup');
const multer = require('multer');
const router = express.Router()

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      console.log(file);
        callBack(null, '../public/prof-img')
    },
    filename: (req, file, callBack) => {
      console.log(file);
        callBack(null, `profile_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })



router
  .route('/')
  .get(controller.allAccess)

router
  .route('/post')
  .get(authJwt.verifyToken,controller.getPosts)
  .post(authJwt.verifyToken,controller.addPost)

router
  .route('/post/:id')
  .patch(authJwt.verifyToken, controller.updatePost)
  .delete(authJwt.verifyToken, controller.deletePost)

router
  .route('/signup')
  .get()
  .post(verifySignUp.checkDuplicateUsernameOrEmail,authController.signup)

router
  .route('/signin')
  .get()
  .post(authController.signin)

router
  .route('/signout')
  .get(authJwt.verifyToken,authController.signout)


router
  .route('/update-user')
  .post(authJwt.verifyToken,upload.single('img'),controller.updateProfile)

 

module.exports = router