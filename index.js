var fs = require('fs'),
    Readable = require('stream').Readable,
    fakestk = require('fakestk');

function _extendScriptStream(jsxPath,opt){
  var script = fs.readFileSync(jsxPath)+'';
  var st = new Readable({objectMode: opt.objectMode});
  var do_once = false;

  st._read = function(){
    if(do_once) return st.push(null);
    do_once = true; // do once
    fakestk.run(script,function(err,res){
      if(res!==''){
        if(opt.objectMode){
          st.push(JSON.parse(res));
        }else{
          st.push(res);
        }
      }
    });
  };

  return st;
};

function extendScriptStream(jsxPath){
  return _extendScriptStream(jsxPath,{objectMode:false});
};

extendScriptStream.obj = function(jsxPath){
  return _extendScriptStream(jsxPath,{objectMode:true});
};

module.exports = extendScriptStream;
