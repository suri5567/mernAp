import mongoose from 'mongoose'

export const databaseConnection = (url)=>{
   return mongoose.connect(url);
} 


