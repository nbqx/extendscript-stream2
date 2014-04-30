## extendscript-stream2

adobe extendscript's output to nodejs readable stream

## install

    npm install extendscript-stream2

## example

```js
var fs = require('fs');
var extendScriptStream = require('.');
var jsxPath = [__dirname,'test','test.jsx'].join('/');

extendScriptStream(jsxPath).pipe(fs.createWriteStream(__dirname+'/out.txt'));

// in objectMode
var through = require('through');
var filter = through(function write(data){
  var val = data.val;
  var len = val.length.toString();
  this.queue(len);
},function end(){
  this.queue(null);
});
extendScriptStream.obj(jsxPath).pipe(filter).pipe(process.stdout);
```
