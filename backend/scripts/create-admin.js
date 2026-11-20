require('dotenv').config();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const User=require('../user.model');
(async()=>{
 const {MONGODB_URI,ADMIN_NAME,ADMIN_EMAIL,ADMIN_PASSWORD}=process.env;
 if(!MONGODB_URI||!ADMIN_NAME||!ADMIN_EMAIL||!ADMIN_PASSWORD||ADMIN_PASSWORD.length<12) throw new Error('Set MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (12+ chars)');
 await mongoose.connect(MONGODB_URI);
 const email=ADMIN_EMAIL.toLowerCase().trim();
 if(await User.exists({email})) throw new Error('An account with this email already exists');
 const user=await User.create({name:ADMIN_NAME,email,passwordHash:await bcrypt.hash(ADMIN_PASSWORD,12),role:'Administrator',department:'Administration'});
 console.log(`Administrator created: ${user.email}`);
 await mongoose.disconnect();
})().catch(async e=>{console.error(e.message);try{await mongoose.disconnect()}catch{};process.exit(1)});
