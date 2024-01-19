
import iframelyConfig from './config.js';

import * as fs from 'fs';

// Load global config from exec dir, because `iframely` can be used as library.

if(process.cwd().endsWith("portfolio") == true){
    // var globalConfigPath = `file:///${process.cwd()}/iframely/config.js`
    var p = process.cwd
    process.cwd = function(){
        return `${p(arguments)}/iframely`
    }
} 


//var globalConfig = import(`${globalConfigPath}`);

var globalConfig = import(`file:///${process.cwd()}/config.js`);  //`./config.js`);
globalConfig = globalConfig && globalConfig.default;


export default {...iframelyConfig, ...globalConfig};