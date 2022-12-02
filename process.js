function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 50; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    console.log('Done');
}

for (let index = 0; index < 10; index++) {
    console.log(index);
    sleep(5000);
    
}
// demo();