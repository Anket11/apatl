#! /usr/bin/env node

const { exec } = require("child_process");
const process = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var jobs = [];

class Command {
  constructor(cmd) {
    this.cmd = cmd;
  }
  execFile = function () {
    return new Promise((resolve, reject) => {
      this.child = exec(this.cmd, (error, stdout) => {
        if (error) {
          reject("Error: ", error);
        } else resolve(stdout);
      });
      process.stdin.once("keypress", (str, key) => {
        if (key && key.ctrl && key.name == "e") {
          this.child.kill("SIGINT");
          resolve("Child process exited");
        }
        if (key && key.ctrl && key.name == "f") {
          this.child.stdin.write("\x1A");
          jobs.push(this.child);
          resolve("Child process background: + " + this.child.pid);
        }
      });
    });
  };

  fg = function () {
    try {
      for (let index = 0; index < jobs.length; index++) {
        const element = jobs[index];
        if (element.pid == this.cmd) {
          element.kill("SIGCONT");
        }
      }
    } catch (err) {
      console.error("error occurred : " + err);
    }
  };

  changeDirectory = function () {
    console.log("Changing directory");
    try {
      process.chdir(process.cwd() + "/" + this.cmd);
    } catch (err) {
      console.error("error occurred while changing directory: " + err);
    }
  };
}
const answerCallback = async (answer) => {
  if (answer.substring(0, 2) === "cd") {
    var command = new Command(answer.substring(3)).changeDirectory();
    rl.question("> " + process.cwd() + " % ", answerCallback);
  } else if (answer.substring(0, 2) === "fg") {
    var command = new Command(answer.substring(3)).fg();
    rl.question("> " + process.cwd() + " % ", answerCallback);
  } else {
    if (answer === "exit") rl.close();

    if (answer.substring(answer.length - 3) === ".js")
      answer = "node " + answer;
    var command = new Command(answer);
    await command
      .execFile()
      .then((res) => {
        console.log(res.toString());
        rl.question("> " + process.cwd() + " % ", answerCallback);
      })
      .catch((err) => {
        console.log(err.toString());
        rl.question("> " + process.cwd() + " % ", answerCallback);
      });
  }
};

rl.question("> " + process.cwd() + " % ", answerCallback);
