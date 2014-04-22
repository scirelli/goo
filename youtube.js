var FS    = require("q-io/fs");
var Q     = require('q');
var exec  = require('child_process').exec;

var cnt = 0;

function runs( a , i, sz ){
    "use strict";
    var deferred = Q.defer(),
        url      = a[i];
    
    if( i >= sz ) { return; }
    try{
        exec('curl ' + url, function( error, stdout, stderr ) {
            console.log(++cnt + ': ' + url);

            if( error ){ deferred.reject(error); }

            //console.log(stdout);
            console.log(stderr);
            try{
                var hash = stdout.indexOf('goo.gl/');
                if( hash != -1 ){
                    console.log( stdout.substr(hash,12) );
                    FS.append("found2.txt", stdout.substr(hash,12) + '\n');
                }
                hash = stdout.indexOf('goo.gl/', hash+6);
                if( hash != -1 ){
                    console.log( stdout.substr(hash,12) );
                    FS.append("found2.txt", stdout.substr(hash,12) + '\n');
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
        return runs(a,i+1,sz);
    },function(e){
        //console.log(e);
        return runs(a,i+1,sz);
    });
}

//grep -roh "www\.youtube\.com/embed/[A-Za-z0-9_\-]*" ./developer.android.com/ > youtube.txt
FS.read('youtube.txt').then(function(file){
    'use strict';
    var a    = file.split('\n'),
        hash = '',
        map  = {},
        url  = 'https://www.youtube.com/annotations_invideo?video_id=',
        a2   = [];

    for( var i=0, l=a.length; i<l; i++ ){
        try{
            hash = a[i].split('/');
            a2.push( url + hash[hash.length-1] );
        }catch(e){
        }
    }
    runs( a2, 0, a2.length );
});
