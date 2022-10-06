import isbot from "isbot";
import MobileDetect from "mobile-detect";

export default function (req,res,next){
try{
    let md = new MobileDetect(req.get('user-agent'));
    //onsole.log(req.headers)
    if(md.is('AndroidOS') === false || md.is('iPone') === false){
        if(isbot(req.get('user-agent')) === true){
            res.status(403).send({status:403,message:'incorrect information'})
        }else{
            next();
        }
       // res.status(403).send({status:403,message:'incorrect information'})
    }else{
        if(isbot(req.get('user-agent') === false)){
            return next();
        }
        res.status(403).send({status:403,message:'incorrect information'})
    }
}catch(e){
// console.log(e)
}
}