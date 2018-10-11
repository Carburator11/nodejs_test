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

    iplocation(ip, (err, res) => {
        const {latitude, longitude, city} = res
        console.log("Iplocation result: ", res)
        
        // it's just a test project!
        const apiKey = "e9b13ab6140094e90af27864db89a7b1"
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`
        const testUrl = "http://api.openweathermap.org/data/2.5/weather?lat=48.6075&lon=7.7493&APPID=e9b13ab6140094e90af27864db89a7b1"

        if(latitude && longitude){
            console.log(url)
            fetch(url, {method: 'get'})
            .then(
                apiResponse => {
                    return apiResponse.json()
                }).then(json => {
                    response.json(
                        {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                        'iplocation': res,
                        'apiResponse': json
                    })
                })
            .catch( error=>{
                console.log("error", error)
                    response.json(
                        {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                        'iplocation': res,
                        'apiResponse': "Weather API error",
                        'error': error
                        }
                    )
                })
        } else {
            fetch(testUrl)
                .then(
                    apiResponse => {
                        return apiResponse.json()
                    }).then(json => {
                        response.json(
                            {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                            'iplocation': res,
                            'apiResponse': json
                        })
                    })
                .catch( error=>{
                    console.log("error", error)
                    response.json(
                        {'response': `hello, your IP address is ${ip}, your location is ${city || "<not found>"}`,
                        'iplocation': res,
                        'apiResponse': "(Test URL)Weather API error",
                        'Test URL': testUrl,
                        'error': error
                        }
                    )
                })
        }
    })
})

app.listen(port, ()=> console.log(`Listening on port ${port}`))
