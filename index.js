import express from 'express';
import gradient from 'gradient-string';
import config from './config.js';
import appController from './router/app.controller.js';
import rateLimit from './module/rate-limit.js';
import userAgent from './module/user-agent.js';
import referer from './module/referer.js';
import url_full from './module/url_full.js';
import SSL from './module/ssl.js';
import proxy from './module/proxy.js'
import geoip from './module/geoip.js';
import fake_ua from './module/fake-ua.js'
import mcache from 'memory-cache';
import as_num from './module/as_num.js';
import cookieParser from "cookie-parser";
import httpProxy from 'http-proxy';
import helmet from 'helmet';
import cluster from 'cluster';
var apiProxy = httpProxy.createProxyServer({});
const app = express();
var serverOne = 'http://localhost:5173'


if (cluster.isMaster) {
   for (let i = 0; i < config.server.munticore; i++) {
       cluster.fork();
   }

   cluster.on('exit', (worker, code, signal) => {
       console.log('Worker #' + worker.process.pid, 'exited');
       cluster.fork();
   });
} else {

   app.set('trust proxy', true)
   var cache = (duration) => {
      return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
          res.send(cachedBody)
          return
        } else {
          res.sendResponse = res.send
          res.send = (body) => {
            mcache.put(key, body, duration * 1000);
            res.sendResponse(body)
          }
          next()
        }
      }
    }
   app.use(helmet());
   app.use(cookieParser());
   app.use(appController);
   app.use(rateLimit)
   app.use(userAgent);
   app.use(referer);
   app.use(SSL);
   app.use(url_full);
   app.use(geoip);
   app.use(as_num);
   app.use(fake_ua);
   app.use(proxy);

   app.all("*", cache(10), async function(req, res) {
    //console.log('ww')
    //res.send({hello:'world!'})
    apiProxy.web(req, res, {target: serverOne});
   });
   
   
   app.listen(config.server.port,() =>{
    if(config.server.logger === true){
       console.log(gradient.rainbow(`NoobServer.js is running on ${config.server.port} on process #${process.pid}`))
    }
   })
}

