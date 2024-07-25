// var prompt = require('prompt-sync')();

// const a = prompt("Enter your name: ");
// console.log(a);

var fs = require('fs');
var os = require('os');

var user = os.userInfo();
// console.log(user);

// console.log(user.username);

// console.log(fs);
// console.log(os);


fs.appendFile('greet.txt', 'hii ' + user.username + '!/n', ()=>{
    console.log("file successfully created");
})

module.exports ={
    user
};


// this is whre i'm making changes

// test github