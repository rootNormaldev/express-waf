import config from '../config.js'
export default function (req,res,next){
        for(let i = 0; i < config.waf.referer.length; i++){
       //     console.log(config.waf.referer[i].includes('localhost'))
            if(config.waf.referer[i].includes(req.headers['referer']) === true || req.headers['referer'] === undefined){
                return next();
            }else{
               // return next();
               res.status(403).send({status:403,message:"Forbidden Error"})
            }
        }
}