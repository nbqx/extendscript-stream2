var fs = require('fs'),
    test = require('tap').test;
var extendScriptStream = require(__dirname+'/../');
var jsxPath = [__dirname,'test.jsx'].join('/');

test('extendScriptStream',function(t){
  var out = __dirname+'/out.txt';
  var ws = fs.createWriteStream(out);
  extendScriptStream(jsxPath).pipe(ws);
  ws.on('close',function(){
    fs.readFile(out,function(err,data){
      t.equal(
        data+'',
        "{\"name\":\"nbqx\",\"val\":[1,2,3,4],\"flag\":false}\r\n"
      );
      fs.unlink(out,function(){
        t.end();
      });
    });
  });
});

test('extendScriptStream.obj',function(t){
  var through = require('through');
  var filter = through(function write(data){
    var val = data.val;
    var len = val.length.toString();
    t.equal(len,'4');
    this.queue(len);
  },function end(){
    t.end();
    this.queue(null);
  });
  extendScriptStream.obj(jsxPath).pipe(filter);
});
