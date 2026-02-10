import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/',async(req,res)=>{
    res.status(200).send({"message":"Welcome to server health 10/10"})
})

app.listen(8000,()=>{
    console.log('server is running on http://localhost:8000');
    
})