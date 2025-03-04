import { Router } from "express"; 

const messageRouter = Router()

messageRouter.get("/", (req, res)=>{
  res.send("messageRouter")
})
export default messageRouter
