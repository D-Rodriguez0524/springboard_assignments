const fs = require('fs');
const process = require('process');
const axios = require('axios');

let path = process.argv[2];


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

if (path.slice(0,4) === 'http') {
    webCat(path);
}
else {
    cat(path);
}