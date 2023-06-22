import { notFound } from "./errors.js"

async function returnModel (res,type,param,mensagem) {
    switch(type){
        case "error":
            return res.status(err.status).json(param(err))
        case "success":
            return res.status(200).json(param)
        case "success-message":    
            console.log(mensagem)
            return res.status(200).json({message: mensagem})
    }
  }

 async function returnModelErr (res,err){
    return res.status(err.status).json(notFound(err))
 } 

 export {returnModel, returnModelErr}