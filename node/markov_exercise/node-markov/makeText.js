/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** gnerate text from markov machine */

function generateText(text){
    let marMachine = new markov.MarkovMachine(text);
    console.log(marMachine.makeText());
}

/** read a file and make text from it */

function makeText(path){
    fs.readFile(path,'utf8', (err,data) => {
        if(err){
            console.error(`Bad path to file: ${path}, ${err}`);
            process.exit(1);
        }
        else {
            generateText(data);
        }
    });
}

async function makeURLText(url){
    let res;

    try{
        res = await axios.get(url);
    }
    catch(e){
        console.error(`Cant read URL: ${url}, ${e}`);
        process.exit(1);
    }
    generateText(res.data);
}

/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}