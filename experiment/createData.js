
let http = require('http')

let alchemy = {}

http.get('http://mop-shoot.tauri.hu/?spell=114773', function(res) {

    

    let data = ''

    res.on('data', chunk => {
        chunk = chunk.toString()
        data += chunk

        


    })

    res.on('end', (something) => {

        let level
        let name
        let itemID
        let itemQuantity

        /* Get reguired profession level of the recipe */
        level = +/\d+/.exec(/Requires \w+ \(\d+\)/g.exec(data))[0]

        /* Get the name of the item or recipe */
        let nameRegExp = /<h1>[\w ']+<\/h1>/g.exec(data)
        name = nameRegExp[0].slice(4, nameRegExp.length - 6)

        /* Get the ID of the item */
        let itemIDRegExp = new RegExp('<a href="\\?item=\\d+">' + name,'g')
        itemIDRegExp = /\d+/.exec(itemIDRegExp.exec(data))
        itemID = +itemIDRegExp[0]

        /* Get item quantity */
        let itemQuantityRegExp = new RegExp('createIcon\\(' + itemID + ', \\d+, \\d+\\)')
        itemQuantity = /\d+\)$/.exec(itemQuantityRegExp.exec(data))[0]
        itemQuantity = +itemQuantity.slice(0, itemQuantity.length - 1)
        
        console.log(level, name, itemID, itemQuantity)
    })

}).on('error', function(e) {
    console.log("Got error: " + e.message);
})

/*
let alchemy = require('./alchemy.json')
let length = 0
for(let item in alchemy) {
    console.log(alchemy[item])
    length += 1
}

console.log(length)
*/