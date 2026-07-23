const mongo_url = process.env.MONGODB_URL
if(!mongo_url){
  throw new Error("MONGODB_URL is not defined in the environment variables.");
}
