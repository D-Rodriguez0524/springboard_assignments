const baseUrl = "http://numbersapi.com";
let favNumber = 13;
// part 1
numberFact = axios.get(`${baseUrl}/${favNumber}?json`);
numberFact
.then(res => console.log(res.data.text))
.catch(err => console.log(err))

// part 2
let favNumbers = [28,24,33]
let facts = axios.get(`${baseUrl}/${favNumbers}?json`);
facts
.then(res => {
    console.log(res.data);
})
.catch(err => console.log(err))

//part 3 

Promise.all(
    Array.from({ length: 4 }, ()=>{
        return $.getJSON(`${baseUrl}/${favNumber}?json`);
    })
).then (facts => {
    facts.forEach(data => $("body").append(`<li>${data.text}</li>`));
})
.catch(err => console.log(err))
