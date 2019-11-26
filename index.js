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

// Most of this was from https://www.youtube.com/watch?v=9VgghGKx_1c
// To be honest I think I get most of this now that its infront of me, but I would never have been able to write this code without help
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
            console.log("making pdf");
            openFile();
            await browser.close();
            process.exit();



        } catch (e) {
            console.log('our error', e);
            process.exit();
        }
    })();
}


    // I found most of how to use this from https://www.npmjs.com/package/open the try and catch stuff was from debugging and idk if I still need it to be honest
function openFile() {
    (async () => {
        try {
            console.log("open pdf")
            // await open('./portfolio.pdf');
            await open('./portfolio.pdf', {app: 'chrome'});
        } catch (e) {
            if (e) {
                console.log('uh oh', e)
            }
        }
    })();
}