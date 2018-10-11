// no semi-colon styling^^

const iplocation =require('iplocation')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var fetch = require("node-fetch");

app.get('/', (request, response) => {
    const ipFromHeader = request.headers["x-forwarded-for"]
    const ip = ipFromHeader ? ipFromHeader.split(',')[0] : request.ip
    console.log("IP: ", ip)

    iplocation(ip, (error, res) => {
        const {latitude, longitude, city} = res
        console.log("Iplocation result: ", res)
        const url = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`
        console.log(url)
        if(latitude && longitude){

            fetch(url)
                .then(
                    apiResponse => {
                        response.json(
                            {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                            'iplocation': res,
                            'apiResponse': apiResponse
                        })
                    }
                )
                .catch(
                    response.json(
                        {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                        'iplocation': res,
                        'apiResponse': "Weather API error"
                        }
                    )
                )
        } else {
            response.json(
                {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                'iplocation': res,
                'apiResponse': "IP location error"
                }
            )
        }
    })
})

app.listen(port, ()=> console.log(`Listening on port ${port}`))
