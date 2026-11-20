const mongoose=require("mongoose");
const schema=new mongoose.Schema({student:{type:mongoose.Schema.Types.ObjectId,ref:"Student",required:true},className:{type:String,required:true},date:{type:String,required:true},type:{type:String,default:"Regular class"},status:{type:String,enum:["Present","Absent"],required:true},markedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}},{timestamps:true});
schema.index({student:1,date:1,type:1},{unique:true});
module.exports=mongoose.model("Attendance",schema);