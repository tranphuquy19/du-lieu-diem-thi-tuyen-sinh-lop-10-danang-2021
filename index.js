const axios = require('axios')
const fs = require('fs');
const newLine = '\r\n'

var results = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getUser(i) {
    console.log(`GET-USER-${i}`)
    await sleep(getRandomInt(100, 300));
    const data = await axios.get(
        `https://tracuudiem.danang.gov.vn:8443/tracuu/public/diemthi?capt=8GPC&cot1=${i}&cot2=&cot3=&cot4=&cot5=&cot6=&cot7=&page=0&size=3&kyThiId=81`,
        { headers: { 'Accept': 'application/json, text/plain, */*', 'X-APP-CODE': 'e1d062d8bb2e38757c8e7c7c9ed3dc28' } })
    return data;
}

async function start() {
    // Min= 010001, Max=110001
    for (let i = 120001; i < 999999; i++) {
        try {
            const { data } = await getUser(`${i}`.padStart(6, '0'));
            results.push(data.content[0]);

            fs.stat('results.csv', function (err, stat) {
                let csv = Object.values(data.content[0]).join(',') + newLine;

                fs.appendFile('results.csv', csv, function (err) {
                    if (err) throw err;
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
    fs.writeFile(`result-${new Date().getTime()}.txt`, JSON.stringify(results), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

start();
