const { readFileSync } = require("fs");

const http = require("http");
const path = require("path");
const url = require("url");
const slugify = require("slugify")
const replaceTemp = require("./modules/replaceTemplates")

const filePath = path.join(__dirname, "dev-data", "data.json")
const data = readFileSync(filePath, "utf-8")
const dataObject = JSON.parse(data)
const tempOverview = readFileSync(path.join(__dirname, "templates", "overview.html"), "utf-8")
const tempProduct = readFileSync(path.join(__dirname, "templates", "product.html"), "utf-8")
const tempCard = readFileSync(path.join(__dirname, "templates", "card.html"), "utf-8")

const latestDataObject = dataObject.map(el => ({
    ...el,
    "slug": slugify(el.productName, { lower: true ,replacement:"_"})
}))

const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)


    if (pathname === "/" || pathname === "/overview") {

        const cardHtmls = latestDataObject.map(el => replaceTemp(tempCard, el)).join("")
        const output = tempOverview.replace(/{%product-card%}/, cardHtmls)
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(output)

    }
    else if (pathname === "/product") {

        const product = latestDataObject.find(el => el.slug === query.id)
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