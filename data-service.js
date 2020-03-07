const fs=require("fs");
var Lmale=[];
var Mmale=[];
var Smale=[];



var err=[];



module.exports.initialize=function(){
    return new Promise(function(resolve, reject){
        try{
        fs.readFile('./data/male/large/wears.json',  (err, data) => {
            if (err) throw err;
            console.log("reading large male styles");
            Lmale=JSON.parse(data);
        });
        fs.readFile('./data/male/medium/wears.json', (err,data)=>{
            if(err) throw err;
            console.log("reading medium male styles");
            Mmale=JSON.parse(data);
        });
        fs.readFile('./data/male/small/wears.json',(err,data)=>{
            if(err) throw err;
            console.log("reading samll male styles");
            Smale=JSON.parse(data);
        })
    }catch{
        console.log("failed initializing");
        reject("failed initializing");
    }
    console.log("successed initializing");
    resolve("successed initializing");
    })
}

module.exports.findMatch=function(style){
    var matchinStyle=[];
    return new Promise(function(resolve, reject){
        if(style.bodyType==small){

        }
        if(style.bodyType==medium){

        }
        if(style.bodyType==large){
                
        }
    })
}
