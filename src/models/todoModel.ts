import mongoose,{Document, Model, Schema, Types} from "mongoose";
interface Todo extends Document{
    task:string,
    description:string,
    status:string
    isCompleted:boolean,
    creator:Types.ObjectId,
    
}


const todoSchema:Schema<Todo> = new Schema({
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
       type:String,
       required:true,
       enum:['Pending','Completed'],
       default:'Pending',
       
    },
    isCompleted:{
        type:Boolean,
        default:false,
        required:true
    },
    creator:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
}) 


const todoModel:Model<Todo> = mongoose.models.Todo ||  mongoose.model<Todo>('Todo',todoSchema) 

export default todoModel;



