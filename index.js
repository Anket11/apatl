#! /usr/bin/env node

const { exec } = require("child_process");
const process = require("process");
const readline = require("readline");
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function shell() {
  this.changeDirectory = function (dir) {
    try {
      process.chdir(process.cwd() + "/" + dir);
    } catch (err) {
      console.error("error occurred while changing directory: " + err);
    }
  };
  this.execCommand = function (cmd) {
    return new Promise((resolve, reject) => {
      var child = exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
      function on_exit() {
        console.log("Process Exit");
        child.kill("SIGINT");
        process.exit(0);
      }
      process.stdin.on("keypress", (str, key) => {
        if (key && key.ctrl && key.name == "c") process.exit();
      });
      process.on("SIGINT", on_exit);
      process.on("exit", on_exit);
    });
  };
}
var myshell = new shell();

const answerCallback = (answer) => {
  if (answer.substring(0, 2) === "cd") {
    myshell.changeDirectory(answer.substring(3));
    rl.question("> " + process.cwd() + " % ", answerCallback);
  } else {
    if (answer.substring(answer.length - 2) === "js") answer = "node " + answer;
    if (answer === "exit") rl.close();
    else {
      myshell
        .execCommand(answer)
        .then((res) => {
          console.log(res);
          rl.question("> " + process.cwd() + " % ", answerCallback);
        })
        .catch((err) => {
          console.log("os >>>", err);
          rl.question("> " + process.cwd() + " % ", answerCallback);
        });
    }
  }
};
// answerCallback(cd)
console.clear();
rl.question("> " + process.cwd() + " % ", answerCallback);
