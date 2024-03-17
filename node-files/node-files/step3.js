PATH = "./"
const argument = process.argv;
const fs = require("fs");
const axios = require('axios');

function cat(path, file){
    fs.readFile(PATH+path, "utf8", (err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        writeToFile(data, file, false, path)
    })
}

async function webCat(url, file){
    try{
        let data = await axios.get(url);
        writeToFile(data.data, file, true, url)
    }
    catch(err){
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}


function writeToFile(data, file, urlFlag, path){
    if (file){
        fs.writeFile(file, data, 'utf8', (err)=> {
            if (err) {
              console.error(`Couldn't write ${file}: \n ${err}`);
              process.exit(1);
            }
            if(!urlFlag){
                console.log(`no output, but ${file} contains ${path} html`)
                process.exit(1)
            }
            console.log(`no output, but ${file} contains content of ${path}`)
          })
        } 
    else {
        console.log(data);
    }
    
}

if ( argument[2].includes("--out")){
    file = argument[3]
    path = argument[4]
}
else{
    file = null
    path = argument[2]
}

if ( path.includes("http") || path.includes("https") ){
    webCat(path, file);
}
else{
    cat(path, file);
}
