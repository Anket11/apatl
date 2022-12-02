const { spawn } = require("child_process");
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

function command(cmd) {
var child = spawn('pwd');
child.stdout.on("data", function (data) {
    console.log("stdout: " + data);
  });
  child.on("close", function (code) {
    console.log("child process exited with code " + code);
    child.kill();
  });
  child.on("error", function (err) {
    console.log("Oh noez, teh errurz: " + err);
  });
}

// const answerCallback = (answer) => {
//     if (answer.substring(0, 2) === "cd") {
//       rl.question("> " + process.cwd() + " % ", answerCallback);
//     } else {
//       if (answer.substring(answer.length - 2) === "js") answer = "node " + answer;
//       if (answer === "exit") rl.close();
//       else {
//       }
//     }
//   };
command('pwd');