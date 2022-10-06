import axios from 'axios'
import config from '../config.js'
export default async function (req,res,next){
try{
    const ip = req.connection.remoteAddress.split(`:`).pop();
    const check_up = await axios.get(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`)
    if(check_up.data['status'] === 'ok'){
        for(let i = 0; i < config.waf.countryCode.length; i++){
            if(check_up.data[ip]['isocode'] !== config.waf.countryCode[i]){
                res.status(403).send({status:403,message:"Forbidden Error"})
            }else{
                next();
            }
        }
        // if(check_up.data[ip]['isocode'] === 'yes'){
        //     res.status(403).send({status:403,message:"Forbidden Error"})
        // }else{
        //     next();
        // }
    }else if(check_up.data['status'] === 'error'){
        next();
    }else{
        res.status(403).send({status:403,message:"Forbidden Error"})
    }
}catch(e){
    //console.log(e)
 }
}