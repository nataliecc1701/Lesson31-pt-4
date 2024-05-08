const fs = require('fs').promises;
const axios = require('axios');

async function cat(path) {
    let exit = await fs.readFile(path, 'utf8')
    // console.log(`cat function data: ${exit}`)
    return exit
}

async function webcat(url) {
    let out;
    try {
        resp = await axios.get(url)
        out = resp.data
    }
    catch {
        out = `request failed with status code ${err.response.status}`
    }
    return out
}

async function readPath(path) {
    if (path.startsWith("http") || path.startsWith("localhost") || path.startsWith("ftp")) {
        console.log("web path")
        return await webcat(path)
    }
    else {
        // console.log("local path")
        return await cat(path)
    }
}

function setOutput(out) {
    if (out > -1 && out < process.argv.length - 1) {
        return process.argv[out+1]
    }
    else return null
}

const out = process.argv.indexOf("--out")
// console.log(`out parameter detected at ${out}`)
const outputFile = setOutput(out);
// console.log(outputFile)

if (out === 2) {
    console.log("need something to cat!")
    process.exit(2)
}

const final = (out===-1) ? process.argv.length : out;
// console.log (`reading from 2 to ${final}`)

async function iterate() {
    for (i=2; i<final; i++) {
        const path = process.argv[i];
        // console.log(`reading ${path}`)
        let data = await readPath(path);
        if (outputFile) {
            fs.appendFile(outputFile,data,"utf8",function(err){
                // console.log(`writing to ${outputFile}`)
                if (err) {
                    console.log(err)
                    process.exit(1)
                }
                // console.log('successfully wrote to file!')
            })
        }
        else {
            console.log(data)
        }
    }
}

iterate()