import config from '../config.js'
export default function (req,res,next){
    for(let i = 0; i < config.waf.url_contains.length; i++){
        //console.log(config.waf.url_contains[i])
        if(req.url.includes(config.waf.url_contains[i]) === true){
            res.status(403).send({status:403,message:"Forbidden Error"})
        }else{
            next();
        }
    }
}