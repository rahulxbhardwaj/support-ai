import {connect} from "mongoose";
const mongo_url = process.env.MONGODB_URL
import dns from "node:dns";
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
if(!mongo_url){
  throw new Error("MONGODB_URL is not defined in the environment variables.");
}
let cache = global.mongoose;
if(!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connectToDb = async () => {
    console.log("Connecting to MongoDB...");
    console.log("MongoDB URL: ", mongo_url);
    if(cache.conn){
        return cache.conn;
    }

    if(!cache.promise){
        cache.promise = connect(mongo_url!).then((c) => c.connection);
    }

    try{
        const conn = await cache.promise;
        cache.conn = conn;
        return conn;
    }catch(err){
        console.error("Error connecting to MongoDB: ", err);
        throw err;
    }

}

export default connectToDb;