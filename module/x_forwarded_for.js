export default function (req,res,next){
    if(req.headers['x-forwarded-for'] === undefined){
        return next();
    }else{
        res.status(403).send({status:403,message:"Forbidden Error"})
    }
}