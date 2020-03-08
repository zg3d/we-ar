const fs = require("fs");
var Lmale = [];
var Mmale = [];
var Smale = [];



var err = [];



module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        try {
            fs.readFile('./assets/male/large/wears.json', (err, data) => {
                if (err) throw err;
                console.log("reading large male styles");
                Lmale = JSON.parse(data);
                console.log(Lmale);
            });
            fs.readFile('./assets/male/medium/wears.json', (err, data) => {
                if (err) throw err;
                console.log("reading medium male styles");
                Mmale = JSON.parse(data);
                console.log(Mmale);
            });
            fs.readFile('./assets/male/small/wears.json', (err, data) => {
                if (err) throw err;
                console.log("reading samll male styles");
                Smale = JSON.parse(data);
                console.log(Smale);
            })
        } catch{
            console.log("failed initializing");
            reject("failed initializing");
        }
        console.log("successed initializing");
        resolve("successed initializing");
    })
}


module.exports.getMatchStyle = function (user) {
    var matchinStyle = [];
    return new Promise(function (resolve, reject) {
        console.log(user);
        if (user.bodytype == 'small') {
            console.log("i'm small male");
            Smale.forEach(Sstyle => {
                console.log(Sstyle);
                if (Sstyle.style == user.style && Sstyle.colorful == user.colorful && Sstyle.hat == user.hat && Sstyle.weather == "summer") {
                    matchinStyle.push(Sstyle);
                    resolve(matchinStyle);
                    console.log("Matching style for small male has found");
                }
            })
        } else {
            reject(matchinStyle);
            console.log("Couldn't found any matching style");
        }
    })
}

