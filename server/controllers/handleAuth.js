import { model } from '../models/useAuth.js'
import bcrypt from 'bcrypt';
import {setUserToken} from '../utility.js'


export const handleSignUp = async (req, res) => {
	const { name, email, password } = req.body;
	const salt = 10;
	try {
		if (!req.body || !name || !email || !password) {
			return res.status(400).json({ msg: "incompleate data" })
		}
		else {
			const hash = await bcrypt.hash(password, salt)
			const newUser = new model({
				name, email, password:hash
			})
			await newUser.save();
			return res.status(201).json({ msg: "data added successfully !!!" })
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Internal server error" });
	}
}

export const handleSignIn = async (req, res) => {
	const { email, password } = req.body;
	
	try {
		if(req.cookies?.uid){
			res.clearCookie("uid");
		}
	  if (!email || !password) {
		return res.status(400).json({ msg: "Incomplete data" });
	  } else {
		const newUser = await model.findOne({ email });
  
		if (!newUser) {
		  return res.status(403).json({ msg: "Invalid User !!!" });
		} else {
		  const passwordMatch = await bcrypt.compare(password, newUser.password);
  
		  if (!passwordMatch) {
			return res.status(403).json({ msg: "Invalid password !!!" });
		  } else {
			const token = setUserToken(newUser);
			res.cookie("uid", token,  {maxAge:24*7*60*60*1000})
			return res.status(201).json({ msg: "Logged in successfully !!!" });
		  }
		}
	  }
	} catch (error) {
	  console.error(error.message);
	  return res.status(500).json({ msg: "Internal server error" });
	}
  };


  export const handleSignOut =(req,res)=>{
        const cookie = req.cookies?.uid;
		try{
			if(!cookie){
				return res.status(400).json({msg:"No active cookie to logout !!!"})
			}else{
				res.clearCookie("uid");
				return res.status(200).json({msg:"Signout successfully !!!"})
			}
		}catch(error){
			console.log(error);
			return res.status(500).json({msg:"Internal server Error !!!"})
		}
  }


 