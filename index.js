var inquirer = require("inquirer");
var fs = require('fs-extra');
var axios = require('axios');
var puppeteer = require('puppeteer');
var open = require('open');
const generateHTML = require('./generateHTML');



inquirer.prompt([
    {
        type: "input",
        name: "userName",
        message: "What is your github username?"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "green",
            "blue",
            "pink",
            "red",
        ]
    }
]).then(function (data) {
    const p1 = generateHTML.generateHTML1(data);

    const url = `https://api.github.com/users/${data.userName}`

    axios.get(url)
        .then(response => {
            console.log(response.data);
            const p2 = generateHTML.generateHTML2(response);
            const portfolio = `${p1}${p2}`
            writeToFile(portfolio);
            pdf(portfolio);
        });
})


function writeToFile(data) {
    fs.writeFile("portfolio.html", data, function (err, data) {
        if (err) console.log('error', err);
    });
}

function pdf(d) {
    (async function () {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(d);
            await page.emulateMedia('screen');
            await page.pdf({
                path: 'portfolio.pdf',
                format: 'A4',
                printBackground: true
            });
            console.log("done");
            openFile();
            await browser.close();
            process.exit();



        } catch (e) {
            console.log('our error', e);
            process.exit();
        }
    })();
}

function openFile() {
    (async () => {
        try {
            await open(`portfolio.pdf`);
        } catch (e) {
            if (e) {
                console.log('uh oh', e)
            }
        }
    })();
}