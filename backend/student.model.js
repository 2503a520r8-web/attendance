const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},passwordHash:{type:String,select:false},roll:{type:String,required:true,unique:true,trim:true},
 regNo:String,dob:String,gender:String,email:{type:String,lowercase:true,trim:true},phone:String,address:String,
 department:{type:String,required:true},course:String,year:String,semester:String,section:String,academicSession:String,
 admissionDate:String,status:{type:String,enum:["Active","Inactive","Graduated"],default:"Active"},
 guardianName:String,guardianPhone:String,emergencyPhone:String,bloodGroup:String,photo:String
},{timestamps:true});
module.exports=mongoose.model("Student",schema);