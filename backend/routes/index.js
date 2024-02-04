const express = require('express');

const router = express.Router();
//import login
const authController = require('../controller/authcontroller');
// 3 import blogcontroller
const blogController = require('../controller/blogController');
//4
const commentController=require('../controller/commentController');
const auth= require('../middlewire/auth');


router.get('/test',(req,res) => res.json({msg:"yes"}));



//user
//register
router.post('/register', authController.register);
//login
      router.post('/login',authController.login); 
// logout 
router.post('/logout',auth, authController.logout); //auth will be called in bet req and res of logout

// refresh
router.get('/refresh',authController.refresh);


           //we have succesfuly completed above routes

//blogs
// create
router.post('/blogs',auth, blogController.create);
//get all
router.get('/blogs/all',auth,blogController.getAll);

//getbyid
router.get('/blogs/:id',auth,blogController.getById);

//update
router.put('/blogs',auth,blogController.update);

//delete
router.delete('/blogs/:id',auth,blogController.delete);
//crud  update delete

//comment

//create
router.post('/comment',auth, commentController.create);

//get
router.get('/comment/:id',auth, commentController.getById);
//create-comment read-comment-by-id

module.exports = router;