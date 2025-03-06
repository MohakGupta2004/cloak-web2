import type { Conversation, Message } from "@prisma/client";
import { db } from "../lib/db";
import type { UserMessage } from "./DTO/message.dto";

class MessageService {
  
  public async sendMessage(message: UserMessage){
   const {senderId, receiverId, content} = message;
   let conversation: Conversation | null = await db.conversation.findFirst({
      where:{
        senderId: senderId,
        receiverId: receiverId
      }
    })

    if(!conversation){
      conversation = await db.conversation.create({
        data:{
          senderId: senderId,
          receiverId: receiverId, 
        }
      })
    }

    const newMessage: Message = await db.message.create({
      data:{
        senderId: senderId,
        content: content,
        conversationId: conversation.id
      }
    })
    if(newMessage){
      conversation = await db.conversation.update({
        where:{
          id: conversation.id
        },
        data:{
          messages:{
           connect:{
              id: newMessage.id
            } 
          }
        }
      })
    }
    return {
      newMessage
    }
  }
}

export default new MessageService()
