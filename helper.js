var chokidar = require('chokidar');

var shelljs = require('shelljs');

chokidar.watch('accordion').on('change', function(){

'use strict';

shelljs.exec("grunt build:accordion");

shelljs.exec("node helper.js");

//shelljs.exit(1);   执行完就退出

});
