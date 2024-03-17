/** Command-line tool to generate Markov text. */
const argument = process.argv
const fs = require("fs");
const axios = require('axios');
const MarkovMachine = require("./markov");

function generateText(data){
    let generator = new MarkovMachine(data)
    return generator.makeText()
}

function fileText(path){
    fs.readFile(path, "utf8", (err,data)=>{
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log(`Generated text from file ${path}`)
        generateText(data)
    })
}

async function urlText(url){
    try{
        console.log("trying to connect")
        let data = await axios.get(url);
        console.log("connected")
        console.log(`Generated text from url ${url}`)
        generateText(data.data)
    }
    catch(err){
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}

if ( argument[2] == "file" ){
    fileText(argument[3]);
}
else if(argument[2] == "url"){
    urlText(argument[3]);
}
else{
    console.log("Not a valid input type was inputted")
    process.exit(1);
}