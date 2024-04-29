const express=require("express")
const dotenv=require('dotenv')
const cors=require('cors')
dotenv.config({ path: './.env' });

const app=express();

app.use(cors())
const connectDB=require('./connectToDb/connect')
connectDB(process.env.MONGO_URI)

app.use(express.json(express.urlencoded))

app.use("/api/user",require('./api/user'))
app.use("/api/admin",require('./api/admin'))

app.get('/',(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

app.listen(3000,()=>{
    console.log("Server is successfully running on port 3000");
})