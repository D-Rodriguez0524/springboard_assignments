const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path,'utf8', (err,data) => {  
        if(err){
            console.error(`Bad path at => ${path}, ${err}`);
            process.exit(1);
        }
        else {
            console.log(data);
        }
    });
}


async function webCat(url){
    try{
        let res = await axios.get(url);
        console.log(res.data);
    }
    catch(e){
        console.error(`Error Fetching ${url}, ${err}`);
        process.exit(1);
    }
}


function output(text, out) {
    if (out) {
      fs.writeFile(out, text, 'utf8', (err) => {
        if (err) {
          console.error(`Couldn't write ${out}, ${err}`);
          process.exit(1);
        }
      });
    } else {
      console.log(text);
    }
  }

let path;
let out;

if(process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path,out);
}
else {
    cat(path,out);
}

