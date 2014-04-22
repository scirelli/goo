var FS    = require("q-io/fs");
var Q     = require('q');
var qhttp = require('q-io/http');
var exec  = require('child_process').exec;

var needle  = "2014/redeem", //new RegExp("",'g'),//new RegExp("(goo\.gl/[A-Za-z0-9]{6})",'g'),
    needle2 = "events/io/2014",
    map = {},
    cnt = 0,
    szA = 0,
    pool = ['a', 'b', 'c', 'd','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'],
    szPool = pool.length;

Math.rndRange = function( min, max ){
    if( isNaN(min) || isNaN(max) ) return NaN;
    return Math.random()*(max-min)+min;
}

function randStr(){
    "use strict";
    var val = '';

    val = pool[~~Math.rndRange(0,szPool)] +
          pool[~~Math.rndRange(0,szPool)] +
          pool[~~Math.rndRange(0,szPool)] +
          pool[~~Math.rndRange(0,szPool)] +
          pool[~~Math.rndRange(0,szPool)] +
          pool[~~Math.rndRange(0,szPool)];
      /*
    while( map[val] ){
        val = pool[~~Math.rndRange(0,szPool)] +
              pool[~~Math.rndRange(0,szPool)] +
              pool[~~Math.rndRange(0,szPool)] +
              pool[~~Math.rndRange(0,szPool)] +
              pool[~~Math.rndRange(0,szPool)] +
              pool[~~Math.rndRange(0,szPool)];
    }
    map[val] = true;
    */
    return val;
    //return "K6E7l8"
}

function runs(){
    "use strict";
    var deferred = Q.defer(),
        str = randStr();

    try{
        exec('curl http://goo.gl/' + str, function( error, stdout, stderr ) {
            console.log(++cnt + ': ' + str );
            if( error ){ deferred.reject(error); }
            //console.log(stdout);
            console.log(stderr);
            try{
                var hash = stdout.indexOf(needle);
                if( hash != -1 || stdout.indexOf(needle2) != -1 ){
                    console.log('Found! goo.gl/' + str);
                    FS.append("found.txt", 'goo.gl/' + str + '\n');
                }
                deferred.resolve();
            }catch(e){
                console.log(e);
                deferred.reject(e);
            }
            //console.log(stdout);
        });
    }catch(e){
        console.log(e);
    }
    return deferred.promise.then(function(){
        return runs();
    },function(e){
        //console.log(e);
        return runs();
    });
}
runs();
