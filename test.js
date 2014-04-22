var FS    = require("q-io/fs");
var Q     = require('q');
var qhttp = require('q-io/http');

var r = new RegExp("(goo\.gl/[A-Za-z0-9]{6})",'g');

//wget -r https://developers.google.com
// grep -r "[^/]goo\.gl/" . > ../tmp/google.txt
FS.read('google.txt').then(function(file){
    var a = file.split('\n'),
        hash = '',
        map = {},
        found = {
            "goo.gl/K6E7l8":true,
            "goo.gl/Tw6kP9":true,
            "goo.gl/xZM9jt":true,
            "goo.gl/q7wKp8":true,
            "goo.gl/1nToQ4":true,
            "goo.gl/5nz6cg":true,
            "goo.gl/5FwCJy":true,
            "goo.gl/Au49Um":true,
            "goo.gl/hmgbrW":true,
            "goo.gl/T3mzjk":true
        };

    for( var i=0, l=a.length; i<l; i++ ){
        //console.log(a[i]);
        try{
            hash = r.exec(a[i])[1];
            if( !found[hash] )
                map[hash] = hash;
        }catch(e){
        }
    }
    for( var i in map ){
        console.log(i);
    }
});
