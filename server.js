const { readFileSync } = require("fs");

const http = require("http");
const path = require("path");
const url = require("url");

const replaceTemp = (temp, productData) => {
    let output = temp.replace(/{%id%}/g, productData.id);
    output = output.replace(/{%product-name%}/g, productData.productName);
    output = output.replace(/{%image%}/g, productData.image);
    output = output.replace(/{%from%}/g, productData.from);
    output = output.replace(/{%nutrients%}/g, productData.nutrients);
    output = output.replace(/{%quantity%}/g, productData.quantity);
    output = output.replace(/{%price%}/g, productData.price);
    output = output.replace(/{%description%}/g, productData.description);
    if (!productData.organic) {
        output = output.replace(/{%notOrganic%}/g, "not-organic");
    } else {
        output = output.replace(/{%notOrganic%}/g, "");
    }
    return output;

}

const filePath = path.join(__dirname, "dev-data", "data.json")
const data = readFileSync(filePath, "utf-8")
const dataObject = JSON.parse(data)
const tempOverview = readFileSync(path.join(__dirname, "templates", "overview.html"), "utf-8")
const tempProduct = readFileSync(path.join(__dirname, "templates", "product.html"), "utf-8")
const tempCard = readFileSync(path.join(__dirname, "templates", "card.html"), "utf-8")

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)


    if (pathname === "/" || pathname === "/overview") {

        const cardHtmls = dataObject.map(el => replaceTemp(tempCard, el)).join("")
        const output = tempOverview.replace(/{%product-card%}/, cardHtmls)
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(output)

    }
    else if (pathname === "/product") {

        const product = dataObject.find(el => el.id === Number(query.id))
        if (!product) {
            res.writeHead(404, {
                "content-type": "text/html",
                "my-own-head": "responsive head"
            })
            return res.end("<h1>No page found</h1>")
        }
        const output = replaceTemp(tempProduct, product)
        res.writeHead(200, { "content-type": "text/html" })
        res.end(output)
    }
    else if (pathname === "/api") {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(data)
    }
    else {
        res.writeHead(400, {
            "content-type": "text/html",
            "my-own-head": "responsive head"
        })
        res.end("<h1>No page found</h1>")
    }
    console.log(req.url)
})
server.listen(800, "127.0.0.1", () => {
    console.log("listening to the local server")
})