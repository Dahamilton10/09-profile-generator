var inquirer = require("inquirer");
var fs = require('fs');


const questions = [
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

        var filename = data.name.toLowerCase().split(' ').join('') + ".json";

        fs.writeFile(filename, JSON.stringify(data, null, '\t'), function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("Success!");

        });
    });
];

function writeToFile(fileName, data) {

}

function init() {

}
init();
