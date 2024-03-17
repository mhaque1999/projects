PATH = "./"
const argument = process.argv;
const fs = require("fs");
const axios = require('axios');

function cat(path){
    fs.readFile(PATH+path, "utf8", (err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url){
    try{
        let data = await axios.get(url);
        //console.log(data.data);
        console.log(data)
    }
    catch(err){
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}

if ( argument[2].includes("http") || argument[2].includes("https") ){
    webCat(argument[2]);
}
else{
    cat(argument[2]);
}
