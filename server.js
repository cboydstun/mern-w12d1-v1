//import dependencies
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

//initialize express
const app = express()

//initialize middleware
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :response-time'))
dotenv.config()

//intiialize a port
const SERVER_PORT = process.env.PORT || 5002;

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(console.log("Connnected to MongoDB successfully!")).catch((err)=>{console.log(err)})

//import routes

//initalize routes

//basic hello
app.get('/', (req, res)=>{
    res.send("Hello Hydrogen. API is running...")
})

//app listening
app.listen(SERVER_PORT, ()=>{console.log(`Server running at ${SERVER_PORT}`)})