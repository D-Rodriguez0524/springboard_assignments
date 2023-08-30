const baseUrl = "http://numbersapi.com";
let favNumber = 13;
// part 1
async function part1(){
    try{
        let res = await $.getJSON(`${baseUrl}/${favNumber}?json`);
        console.log(res);
    }
    catch (e){
        console.log(e);
    }
}
part1();

// part 2
const favNumbers = [28,24,33];
async function part2(){
    try{
        let res = await $.getJSON(`${baseUrl}/${favNumbers}/?json`);
        console.log(res);
    }
    catch(e){
        console.log(e);
    }
}
part2();

//part 3 
async function part3(){
    try{
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseUrl}/${favNumber}?json`))
    );
    facts.forEach(data => {
        $("body").append(`<li>${data.text}</li>`)
    });
}
catch(e){
    console.log(e);
}
}
part3();
