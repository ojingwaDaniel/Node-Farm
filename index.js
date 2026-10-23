
// synchronous /non blocking code

const fs = require("fs")
const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
const textOut = `This is what we know about avacodo: ${textIn}\nWas created by ${Date.now()}`
fs.writeFileSync("./txt/output.txt", textOut)
console.log(textIn)
console.log("file written")

// asynchronous / Blocking code
fs.readFile("./txt/startttt.txt", "utf-8", (err, data1) => {
    if (err) {
        console.log("error occured while reading the file:confirm if the file exisit")
    }
    console.log(data1)
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3)
            fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, 'utf-8', err => {
                console.log("Your file has been written 😄")
            })
        })

    })
})
console.log("reading the file....")