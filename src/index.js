import express from 'express'
import 'dotenv/config'
import matchesrouter from './routes/matches.js'
const app = express()


// middlewar
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//routes
app.use('/matches',matchesrouter)


app.get('/',async(req,res)=>{
    res.status(200).send({"message":"Welcome to server health 10/10"})
})


app.listen(8000,()=>{
    console.log('server is running on http://localhost:8000');
    
})