const yargs = require('yargs');

const argv = yargs
    .usage('Usage: $0 --version <version> [options]')
    .option('release', {
        alias: 'r',
        describe: 'printing out the release',
        type: 'string',
        demandOption: false
    })
    .option('foo', {
        alias: 'f',
        describe: 'tells a joke',
        type: 'boolean',
        default: false
    })
    .option('bar', {
        alias: 'b',
        describe: 'tells a riddle',
        type: 'boolean',
        default: false
    })
    .help('h')
    .alias('h', 'help')
    .example('')
    .argv;

function main() {
    // console.log("argv: ", argv);
    if(argv.release){
        console.log(argv.release);
    }

    if(argv.foo){
        console.log("Why can monday lift saturday? because it's a week day!");
    }

    if(argv.bar){
        console.log("What speaks without a mouth and hear with no ears? I have no body and I come alive in the wind? What am I?.... An echo");
    }
}

main();