import config from '../config.js'

export default function (req,res,next){
try{
  for(let i = 0; i < config.waf.method.length; i++){
    if(req.method === config.waf.method[i]){
        return next()
    }else {
        res.status(403).send({status:403,message:"Forbidden Error"})
    }
  }
}catch(e){
 //disable error message display
 //Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
}
}