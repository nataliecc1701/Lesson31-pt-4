const fs = require('fs')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.log(err)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webcat(url) {
    axios.get(url)
        .then(function(resp){
            console.log(resp.data)
        })
        .catch(function(err){
            console.log(`request failed with status code ${err.response.status}`)
        })
}

const path = process.argv[2]
if (path.startsWith("http") || path.startsWith("localhost") || path.startsWith("ftp")) {
    webcat(path)
}
else {
    cat(path)
}