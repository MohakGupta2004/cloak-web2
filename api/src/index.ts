import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './auth/auth.router' 
import messageRouter from './message/message.router'
const app = express()
const PORT = process.env.PORT || 5000
const BASE_URL = process.env.BASE_URL
app.use(cookieParser()); // for parsing cookies 
app.use(express.json()); // for parsing application/json

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/message`, messageRouter);


app.listen(PORT, ()=>{
  console.log(`Server running at PORT:${PORT}`)
})
