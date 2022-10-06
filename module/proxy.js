import axios from 'axios';
import ip1 from 'ip';

export default async function (req,res,next){
    //console.log(ip1.address())
    const ip = req.connection.remoteAddress.split(`:`).pop();
    const check_up = await axios.get(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`)
    if(check_up.data['status'] === 'ok'){
        if(check_up.data[ip]['proxy'] === 'yes'){
            res.status(403).send({status:403,message:"Forbidden Error"})
        }else{
            next();
        }
    }else if(check_up.data['status'] === 'error'){
        next();
    }else{
        res.status(403).send({status:403,message:"Forbidden Error"})
    }
    //if()
}