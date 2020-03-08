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
            });
            fs.readFile('./assets/male/medium/wears.json', (err, data) => {
                if (err) throw err;
                console.log("reading medium male styles");
                Mmale = JSON.parse(data);
            });
            fs.readFile('./assets/male/small/wears.json', (err, data) => {
                if (err) throw err;
                console.log("reading samll male styles");
                Smale = JSON.parse(data);
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
    var hat = (user.acce === 'true');
    var colorful = (user.acce === 'true');

    return new Promise(function (resolve, reject) {

        if (user.BodyT == 'Skinny') {
            Smale.forEach(Sstyle => {
                console.log(Sstyle);
                if (Sstyle.style == user.style && Sstyle.colorful == colorful && Sstyle.hat == hat && Sstyle.weather == user.weather) {
                    console.log("Asdfasdfsdfasdf");
                    matchinStyle.push(Sstyle);
                }
            });

            console.log(matchinStyle);

            if (matchinStyle.length == 0) {
                reject("No Match");
                console.log("Cannot find a match!");
            }
            resolve(matchinStyle)
            console.log("Matching style for small male has found");

        } else if (user.BodyT == 'Average') {

            Mmale.forEach(Mstyle => {
                if (Mstyle.style == user.style && Mstyle.colorful == colorful && Mstyle.hat == hat && Mstyle.weather == user.weather) {
                    matchinStyle.push(Mstyle);
                }
            })
            if (matchinStyle.length == 0) {
                reject("No Match");
                console.log("Cannot find a match!");
            }
            resolve(matchinStyle)
            console.log("Matching style for small male has found");



        } else if (user.BodyT == 'Big') {

            Lmale.forEach(Lstyle => {
                if (Lstyle.style == user.style && Lstyle.colorful == colorful && Lstyle.hat == hat && Lstyle.weather == user.weather) {
                    matchinStyle.push(Lstyle);
                }
            })
            if (matchinStyle.length == 0) {
                reject("No Match");
                console.log("Cannot find a match!");
            }
            resolve(matchinStyle)
            console.log("Matching style for small male has found");
        }
        else {
            Smale.forEach(Sstyle => {
                if (Sstyle.style == user.style && Sstyle.colorful == colorful && Sstyle.hat == hat && Sstyle.weather == user.weather) {
                    matchinStyle.push(Sstyle);
                }
            })
            if (matchinStyle.length == 0) {
                reject("No Match");
                console.log("Cannot find a match!");
            }
            resolve(matchinStyle)
            console.log("Matching style for unknown male has found");
        }
    })
}

