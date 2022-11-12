import express from 'express'
import dotenv from 'dotenv'
// import {connectDB} from './config/db.js'
// import allRoutes from './router/index.js'
import cookieparser from 'cookie-parser'
import cors from'cors'

//deployment
import http from 'http'
import path from 'path'
const __dirname = path.resolve()


dotenv.config()

const port = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(cookieparser())
app.use(express.json())
// app.use('/api',allRoutes)

//const httpServer = http.createServer(app)

// if(process.env.NODE_ENV==="production"){
   app.use(express.static('client/build'))

   app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
// }

// else{

// app.get("/",(req,res)=>{
//       res.send("api running")
// })

// }

// await server.start();
// app.applyMiddleware({
//      path:'/api' 
// })

app.listen(port,()=>{
   // connectDB()   
	console.log(`app started at port ${port}`)
})