
import express from 'express'
import { handleSignUp, handleSignIn, handleSignOut} from '../controllers/handleAuth.js'
import {alreadyLoggedIn} from '../middlewares/CheckPreAuthentication.js'


const router = express.Router();

router.post("/signup", handleSignUp)
router.get('/AlreadyLoggedIn', alreadyLoggedIn);
router.post("/", handleSignIn)
router.get('/signout', handleSignOut);


export default router;