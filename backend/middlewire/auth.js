

const JWTService = require('../service/JWTService')
const User = require('../model/user');
const UserDto= require('../dto/user');


const auth=async (req, res, next) => {

    try {
        // 1 refresh and acces token validation
  const {refreshToken,accessToken} = req.cookies;

  if(!refreshToken || !accessToken){
const error = {
status:401,
message:"Un authorized",
}
return next(error);

  }

  let _id;
  try {
   _id = JWTService.verifyAccessToken(accessToken);//it will return payload , that is _is which we have given 
  } catch (error) {
   return next(error);
  }
   
  //check id is in db or not
  let user;
  try {
   user = await User.findOne({_id:_id});
  } catch (error) {
       return next(error);
  }

const userDto = new UserDto(user);
req.user= userDto;
next();
    } catch (error) {
        return next(error);
    }

}

module.exports = auth;