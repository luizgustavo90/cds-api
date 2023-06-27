import { notFound } from "./errors.js"

async function returnModel (res,type,param,mensagem) {
    switch(type){
        case "error":
            return res.status(err.status).json(param(err))
        case "success":
            return res.status(200).json(param)
        case "success-message":    
            return res.status(200).json({message: mensagem})
    }
  }

 async function returnModelErr (res,err){
    return res.status(err.status).json(notFound(err))
 } 

 async function returnModelToken(res,token){
    return res.status(200).json({token})
 }

 export {returnModel, returnModelErr, returnModelToken}