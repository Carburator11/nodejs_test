// no semi-colon styling^^

const iplocation =require('iplocation')
const express = require('express')
const app = express()

app.get('/', (request, response) => {
    const { ip } = request
    console.log("IP: ", ip)

    iplocation(ip, (error, res) => {
        //const {lat, lon, city} = res
        console.log("Iplocation result: ", res)
        // console.log(`Ip adress ${ip} located in ${city || "<not found>"} (${lat}, ${lon}) `)
        response.json(
            {'response': `hello, your IP address is ${ip}, your location is ${"<not found>"}`,
            'iplocation': res
        })
    })
} )

app.listen(3000, ()=> console.log("Listening on port 3000"))
