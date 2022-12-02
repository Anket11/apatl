#! /usr/bin/env node

const { spawn } = require("child_process");
const process = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Command {
  constructor(cmd) {
    this.child = spawn("pwd");

    this.execCommand = function () {
      return new Promise((resolve, reject) => {
        // this.child.on("close", function (code) {
        //   console.log("child process exited with code " + code);
        // });
        this.child.stdout.on("data", function (data) {
          console.log("stdout: " + data);
          resolve(data);
        });
        this.child.on("error", function (err) {
          console.log("Oh noez, teh errurz: " + err);
          reject(err);
        });
      });
    };
  }
}
function command(cmd) {
  var child = child.stdout.on("data", function (data) {
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
console.clear();
const answerCallback = (answer) => {
  command = new Command(answer);
  command
    .execCommand()
    .then((res) => {
      rl.question("> " + process.cwd() + " % ", answerCallback);
    })
    .catch((err) => {
      rl.question("> " + process.cwd() + " % ", answerCallback);
    });
  //   rl.question("> " + process.cwd() + " % ", answerCallback);
};

rl.question("> " + process.cwd() + " % ", answerCallback);
