export default function (req,res,next){
    if(req.get('user-agent') === undefined){
        return res.status(401).send('Unauthorized');
    }else{
        if(req.get('user-agent').includes('Mozilla/5.0') !== true){
            res.status(403).send({status:403,message:"Forbidden Error"})
        }else{
            return next();
        }
    }
}