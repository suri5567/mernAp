import jwt from 'jsonwebtoken';

export const setUserToken = (user)=>{
   const payload = {
	userId:user._id,
	email:user.email,
	password:user.password
   }
   return jwt.sign(payload, process.env.SECRET_KEY)
}

export const getUserToken = (token)=>{
   return jwt.verify(token, process.env.SECRET_KEY)
}