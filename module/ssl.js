import config from "../config.js"
export default function (req,res,next){
    if(config.waf.SSL === true){
        //https
        if(req.protocol !== 'https'){
            res.status(403).send({status:403,message:"Forbidden Error"})
        }else{
            return next();
        }
    }else {
        //http
        if(req.protocol !== 'http'){
            res.status(403).send({status:403,message:"Forbidden Error"})
        }else{
            return next();
        }
    }
}