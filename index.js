// no semi-colon styling^^

const iplocation =require('iplocation')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (request, response) => {
    const ipFromHeader = request.headers["x-forwarded-for"]
    const ip = ipFromHeader ? ipFromHeader.split(',')[0] : request.ip
    console.log("IP: ", ip)

    iplocation(ip, (error, res) => {
        const {lat, lon, city} = res
        console.log("Iplocation result: ", res)
        response.json(
            {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
            'iplocation': res
        })
    })
} )

app.listen(port, ()=> console.log(`Listening on port ${port}`))
