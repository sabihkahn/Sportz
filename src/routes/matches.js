import express from 'express'
import {createMatchSchema, listMatchesQuerySchema} from '../validation/validation.js'
import {db} from '../db/db.js'
import {matches} from '../db/schema.js'
const matchesrouter = express.Router()
import {MATCH_STATUS} from '../validation/validation.js'
import { getMatchStatus } from '../utils/match-status.js'
import { desc } from 'drizzle-orm'

const Max_limit = 100
matchesrouter.get('/',async(req,res)=>{
   const parsed = listMatchesQuerySchema.safeParse(req.query)
   if(!parsed.success){
    return res.status(400).send({error:"invalid query",detail:JSON.stringify(parsed.error)})
 }

 const limit =  Math.min(parsed.data.limit ?? 50,Max_limit)


    try {
        const data = await db
        .select()
        .from(matches)
        .orderBy((desc(matches.createdAt)))
        .limit(limit)
        res.status(200).send({data})
    } catch (error) {
        res.status(500).send({error:'failed to get matches',data:error})
    }
})
matchesrouter.post('/data', async(req,res)=>{
    console.log(req.body ,"this is req.body😊")
    const parsed = createMatchSchema.safeParse(req.body)
    console.log(parsed);
    
    if(!parsed.success){
       return res.status(400).send({error:"invalid payload",detail:JSON.stringify(parsed.error)})
    }

    try {
        const {data:{startTime,endTime,homeScore,awayScore}} = parsed
        const [event] = await db.insert(matches).values({
          ...parsed.data,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          homeScore: homeScore ?? 0,
          awayScore: awayScore ?? 0,
          status: getMatchStatus(startTime, endTime) ?? 'scheduled'
        }).returning()
        if(res.app.locals.broadcastmatchcrated){
             res.app.locals.broadcastmatchcrated(event)
        }

        return res.status(200).send({data: event})
    } catch (error) {
console.log('this is error 😢',error);

        return res.status(500).send({error:'failed to create a match',detail:error})
         
    }
})


matchesrouter.post('/test',async(req,res)=>{
    const {text} = req.body
    console.log(req.body);
    
    res.send(req.body)
})
export default matchesrouter