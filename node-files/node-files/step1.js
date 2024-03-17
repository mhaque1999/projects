PATH = "./"
const argument = process.argv;
const fs = require("fs");


function cat(path){
    fs.readFile(PATH+path, "utf8", (err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}

cat(argument[2])