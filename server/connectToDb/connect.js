const mongoose=require('mongoose')

const connect=async (mongo_uri)=>{
    try {
        await mongoose.connect(mongo_uri);
        console.log("Database connected successfully");
      } catch (error) {
        console.log(error);
      }
}

module.exports=connect