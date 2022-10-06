
export default function (req,res,next){
  const ip = req.connection.remoteAddress.split(`:`).pop();
  if(req.cookies[ip] === undefined){
    res.cookie(ip,0)
  }else{
      if(typeof parseInt(req.cookies[ip]) !== 'number'){
        res.status(403).send({status:403,message:"Forbidden Error"})
      }else{
        //console.log('1.0')
        //console.log(req.cookies[ip] === )
        if(req.cookies[ip] === '0'){
          console.log('1')
          res.cookie(ip,1)
        }else if(req.cookies[ip] === '1'){
          console.log('2')
          res.cookie(ip,2)
        }else if(req.cookies[ip] === '2'){
          console.log('3')
          res.cookie(ip,3)
        }else if(req.cookies[ip] === '3'){
          res.cookie(ip,4)
        }else if(req.cookies[ip] === '4'){
          res.cookie(ip,5)
        }else if(req.cookies[ip] === '5'){
          res.cookie(ip,6)
        }
      }
  }
  if(req.cookies[ip] > 5){
    setTimeout(() =>{
      console.log(1)
    },3600)
    res.status(403).send({status:403,message:"Forbidden Error"})
  }else{
    next();
  }
}