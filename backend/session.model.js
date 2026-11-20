const mongoose=require('mongoose');
const schema=new mongoose.Schema({title:{type:String,required:true},department:{type:String,required:true},date:{type:String,required:true},startsAt:{type:Date,default:Date.now},endsAt:{type:Date,required:true},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},active:{type:Boolean,default:true}},{timestamps:true});
module.exports=mongoose.model('AttendanceSession',schema);
