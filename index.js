var inquirer = require("inquirer");
var fs = require('fs');
var axios = require('axios');
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
        });

})


function writeToFile(data) {
    fs.writeFile("portfolio.html", data, function (err, data) {
        if (err) console.log('error', err);
    });
}
function init() {

}
init();
