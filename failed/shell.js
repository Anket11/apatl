#!/usr/bin/env node

const cp = require('child_process');

const k = cp.exec('bash');

k.stdin.end(`
   var=0;
   while true; do 
       var=$((var+1))
       echo "count: $var"
       sleep 0.01
   done;
`);

k.stdout.pipe(process.stdout);
k.stderr.pipe(process.stderr);


const pauseAndRestart = () => {
    console.log(k);
    k.kill('SIGSTOP');
    setTimeout(() => {
      k.kill('SIGCONT');
  }, 2000);

};

pauseAndRestart();