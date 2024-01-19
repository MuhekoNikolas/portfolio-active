
import iframelyConfig from './config.js';
import path from 'path'

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

var currentModuleURL = new URL(import.meta.url);
var currentModulePath = path.dirname(currentModuleURL.pathname);
var _path = `${currentModulePath}/config.js`//portfolio/backendResources/config.cjs`
var globalConfig = await import(_path) 

globalConfig = globalConfig && globalConfig.default;

//console.log(iframelyConfig, globalConfig, "pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")

export default {...iframelyConfig, ...globalConfig};