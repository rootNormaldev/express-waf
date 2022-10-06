import axios from 'axios'
import config from '../config.js'
export default async function (req,res,next){
try{
    const ip = req.connection.remoteAddress.split(`:`).pop();
    let url = `https://proxycheck.io/v2/${ip}?vpn=1&asn=1`
    const countryCode = await axios.get(url)
    //console.log(countryCode.data['as'])
   if(countryCode.data['status'] === 'ok'){
    for(let i = 0; i < config.waf.countryCode.length; i++){
        if(countryCode.data[ip]['asn'] === config.waf.as_name[i]){
            res.status(403).send({status:403,message:"Forbidden Error"})
        }else{
            next();
        }
    }}else if(countryCode.data['status'] === 'error'){
        return next();
    }else{
        res.status(403).send({status:403,message:"Forbidden Error"})
    }
}catch(e){
 // console.log(e)
}
}