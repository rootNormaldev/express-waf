import SimplDB from "simpl.db"
const db = new SimplDB({dataFile : './db/user.json'});
export default function (req,res,next){
let ip = req.connection.remoteAddress.split(`:`).pop()
  if(db.get(ip) === undefined){
    db.set(ip,{score:0})
    next();
  }else{
    if(db.get(`${ip}.score`) < 5){
        const get_score = db.get(`${ip}.score`)
        db.update(ip, (update) => update.score = get_score + 1); // { name: 'Peter👨🏻‍💻' }
        next();
    }else {
        res.status(403).send({status:403,message:'rate limit exceeded wait 1h for reset'})
    }
  }
  
}