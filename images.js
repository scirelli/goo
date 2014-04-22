var FS    = require("q-io/fs");
var Q     = require('q');
var qhttp = require('q-io/http');
var exec  = require('child_process').exec;

var r  = new RegExp("(goo\.gl/[A-Za-z0-9]{6})",'g'),
    map = {},
    cnt = 0,
    szA = 0;

function runs( a, i ){
    "use strict";
    var deferred = Q.defer();
    
    if( i >= szA ){ return; }

    try{
        exec('identify -verbose ' + a[i], function( error, stdout, stderr ) {
            console.log('Executions: ' + ++cnt);
            if( stderr ){ deferred.reject(stderr); }
            try{
                var hash = r.exec(stdout);
                if( hash && hash instanceof Array && hash.length ){
                    hash = hash[1];
                    map[hash] = hash;
                    console.log('Hash: ' + hash );
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
        return runs( a, i+1 );
    },function(){
        console.log('rejected');
        return runs( a, i+1 );
    });
}

//find ../../developers.google.com/ -type f -name *.jpg -o -name *.jpeg -o -name *.webp -o -name *.gif -o -name *.png -o -name *.bmp > images.txt
FS.read('images.txt').then(function(file){
    "use strict";
    var a = file.split('\n'),
        promises = [],
        deferred = null;

    szA = a.length;    
    runs(a,0).then(function(){
        console.log(map);
    },
    function(){
        console.log(map);
    });
});

