const Joi = require('joi');
const User = require('../model/user');//to check email alredy exist or not
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const UserDto=require('../dto/user'); //example of data control object
//new
const JWTService=require('../service/JWTService');
// //
// const w=require('../service/JWTService');
//for password hashing install and use bcryptjs
const bcrypt = require("bcryptjs");
//to update refreshtoken
const RefreshToken = require('../model/token');


const authcontroller = {
   async register(req,res,next) {
                 //what we will check
// 1 validate user niput by using library or manually so install joi
const userRegisterSchema = Joi.object({
   username: Joi.string().min(5).max(30).required(),
   name: Joi.string().max(30).required(),
   email: Joi.string().email().required(),
   password: Joi.string().pattern(passwordPattern).required(),
   confirmPassword: Joi.ref("password"),
 });

                  //the above is the correct info for registr
                  //  now validing user data req from user body
                  const { error } = userRegisterSchema.validate(req.body);

                  //if okay it will return null otherwise error that we will handle in next step        
       
       

// 2 if eror in validation return --> via middlewire
if (error) {

   return next(error);
 }
// 3 if mail or username already registerd return --> an error
const { username, name, email, password } = req.body;

try{
const emailInUse = await User.exists({ email });

const usernameInUse = await User.exists({ username });

   // //if mail exists

   if (emailInUse) {
      const error = {
        status: 409,
        message: "Email already registered, use another email!",
      };

      return next(error);
    }
// //username already exist

    if (usernameInUse) {
      const error = {
        status: 409,
        message: "Username not available, choose another username!",
      };

      return next(error);
    }
  } catch (error) {
    return next(error);
  }


// 4  password hash
const hashedPassword = await bcrypt.hash(password, 10);


// // 5 store data to db
let accessToken;
let refreshTokrn;
try {

   const userToRegister = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });
   
    user = await userToRegister.save();

    //token generation
    accessToken = JWTService.signAccessToken({_id:user._id},"30m");//payload try to keep small with uniquely identified like here id
    refreshTokrn = JWTService.signRefreshToken({_id:user._id},"60m");
} catch (error) {
   return next(error);
}

//store token to db
await JWTService.storeRefreshToken(refreshTokrn,user._id);

//send token n cookie
res.cookie('accessToken',accessToken,{//1st is key then vlaue ,then expire of cookie
   maxAge:1000*60*60*24,
   httpOnly:true,
});

res.cookie('refreshToken',refreshTokrn,{
   maxAge:1000*60*60*24,
   httpOnly:true,
});
// 6 send response
  //dto format
  const userDto = new UserDto(user);
return res.status(201).json({user:userDto, auth:true});

   }, 

                             //login method

   async login(req,res,next) {
// 1 validate user input
        //we expect such type of shape (a type od DTOs)
  const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern),
    });

// 2 if validation error return error

const {error} = userLoginSchema.validate(req.body);
if(error){
   return next(error);
}

// 3 match userame and password
const { username, password } = req.body;
//const username = req.body.username;
//const password = req.body.password;
let user;
try {
   //match username
    user = await User.findOne({username}); //all the user info wil come to user named variable
if(!user){
   const error = {
      status:401,
message:"Invalid username"
   }
   return next(error);
}
   //match password 
   //password -> hash then compare
   const match = await bcrypt.compare(password,user.password);

   if(!match){
      const error = {
         status:401,
         message:"Invalid password"
      }
      return next(error);
   }
} catch (error) {
   return next(error);
}

//we also add token after login 
            //there amy be  a refresh token or maynot be so if there then we update otherwise add a new token to db
      
       const accessToken = JWTService.signAccessToken({_id:user._id},"30m");
       const refreshTokrn = JWTService.signRefreshToken({_id:user._id},"60m");
            //update refreshtoken in db to correspond user
            try {
              await RefreshToken.updateOne({
                  _id:user._id
               },{token:refreshTokrn},
               {upsert:true}//it means if there is no matching record it simply add to db
               )
            } catch (error) {
             return next(error);  
            }
        
       //send res in cookie
       res.cookie('accessToken',accessToken,{
         maxAge: 1000*60*60*24,
         httpOnly:true
       });
       res.cookie('refreshToken',refreshTokrn,{
         maxAge: 1000*60*60*24,
         httpOnly:true
       });
// 4 return response
   //making a user object to dto format
   const userDto = new UserDto(user);

return res.status(200).json({user:userDto, auth:true});
   },

                         //logout method
    async logout(req, res, next){
      console.log(req);
   // 1 delete refresh token from db
   const {refreshToken} = req.cookies;   //name shoud be equal to cookie key name

   try {
      RefreshToken.deleteOne({token:refreshToken});
   } catch (error) {
      return next(error);
   }
   // 3 delete cokkie

   res.clearCookie('accessToken');
   res.clearCookie('refreshToken');
   //2 send response
   return res.status(200).json({user:null, auth:false})
    },
    
    
                                //refresh method
          
        async refresh(req, res, next){
             
         //1 get original refresh token
           
         const originalRefershToken = req.cookies.refreshToken;

         //2 verify refresh token
         let id;
         try {
            id = JWTService.verifyRefreshToken(originalRefershToken)._id;
         } catch (e) {
            const error = {
               status:401,
               message:"Unauthorized"
            }
            return next(error);
         }
           //now check in db

           try {
            const match=RefreshToken.findOne({_id:id, token:originalRefershToken});

            if(!match){
               const error = {
                  status:401,
                  message:"Unauthorized",
               }
               return next(error);
            }
           } catch (error) {
            return next(error);
           }
         // 3 generate new token
           // 4 update db
try {
   const accessToken=JWTService.signAccessToken({_id:id},"30m");
   const refreshToken=JWTService.signRefreshToken({_id:id},"60m");
await RefreshToken.updateOne({_id:id},{token:refreshToken});

res.cookie('accessToken',accessToken,{
   maxAge:1000*60*60*24,
   httpOnly:true,
});

res.cookie('refreshToken',refreshToken,{
   maxAge:1000*60*60*24,
   httpOnly:true,
});

} catch (error) {
   return next(error);
}

const user =await User.findOne({_id:id});
const userDto= new UserDto(user);

// 5 send response
return res.status(200).json({user:userDto, auth:true});
       

        }, 
    
}

module.exports = authcontroller ;