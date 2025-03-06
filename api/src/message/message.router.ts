import express, { Router } from "express"; 
import authMiddleware from "../middleware/authMiddleware";
import MessageService  from "./message.service";
import HttpStatusCode from "../lib/statusCode";

const messageRouter = Router()

messageRouter.
  post('/send/:id', authMiddleware, async (req: express.Request, res: express.Response)=>{
   try {
    const {content} = req.body
    const {id: receiverId} = req.params;
    const result = await MessageService.sendMessage({receiverId, senderId: req.user.id, content}) 
    res.status(HttpStatusCode.CREATED).json(result.newMessage)
   } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong"
      }) 
   } 
    
  })
export default messageRouter
