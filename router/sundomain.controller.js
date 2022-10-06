import config from '../config.js';

export default function (){
    if(config.subdomain.enabled === false){
        next()
    }
}