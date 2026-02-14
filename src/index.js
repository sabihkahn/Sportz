import express from 'express'
import 'dotenv/config'
import http from 'http'
import matchesrouter from './routes/matches.js'
import { attachwebsocketserver } from './ws/server.js'
const app = express()
const Port = Number(process.env.Port || 8000)
const Host = '0.0.0.0'
const server = http.createServer(app)
// middlewar
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//routes
app.use('/matches',matchesrouter)


app.get('/',async(req,res)=>{
    res.status(200).send({"message":"Welcome to server health 10/10"})
})

const {broadcastmatchcrated} = attachwebsocketserver(server)
app.locals.broadcastmatchcrated = broadcastmatchcrated;


server.listen(Port,Host,()=>{
    console.log(`server is running on http://localhost:${Port}`);
})