import mongoose from "mongoose";
type ConnectionObject ={
   isConnected?:number
}

const connection:ConnectionObject = {};

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log('Db Already Connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI || '' ,{})
        connection.isConnected = mongoose.connection.readyState;
        console.log('Database Connected Successfully')
    } catch (error) {
        console.error('Database connection failed', error)
        process.exit(1)
    }
}



export default dbConnect







