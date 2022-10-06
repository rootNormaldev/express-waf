export default {
   "server":{
      "logger":true,
      "uam":true,
      "captcha":false,
      "key":"",
      "port":3000,
      "munticore":1
     },
   "waf":{
      "method":["GET","POST"],
      "ratelimit":5,
      "reset_time":3600, //time of reset (s) seconds
      "blacklist":["0.0.0.0"],
      "referer":["localhost"],
      "SSL":false, //false = http true = https
      "url_contains":["?"],
      "countryCode":["TH"],
      "as_name":[]
   },
   proxy:{
      server:['0.0.0.0']
   },
   subdomain:{
      enabled:false,
      domain:["test.localhost.com:1270.0.0.1"]
   },
   auto_system:{
      "enabled":false  //true = on //false = off  default false
   }
}