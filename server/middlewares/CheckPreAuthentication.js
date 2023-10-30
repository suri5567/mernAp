
import {getUserToken} from '../utility.js'


export const alreadyLoggedIn = (req,res)=>{
    const userCookie =  req.cookies?.uid;
	console.log("cookie", req?.cookies.uid);
	
	try{
		if(!userCookie){
			return res.status(400).json({msg:"Cookie no available"})
		}
		else{
			const tokenRes = getUserToken(userCookie);
			if(!tokenRes){
				return res.status(403).json({msg:"Invalid cookie"})
			}else{
				return res.status(201).json({msg:"user already loggedIn"})
			}
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({msg:"Internal server error"})
	} 
}