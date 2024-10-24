#!/usr/bin/env node
const https = require('https');
const yargs = require('yargs');

const argv = yargs
    .usage('Usage: $0 --url <url> [options]')
    .option('url', {
        alias: 'u',
        describe: 'URL to shorten',
        type: 'string',
        demandOption: true
    })
    .option('qr', {
        alias: 'q',
        describe: 'Generate QR code link',
        type: 'boolean',
        default: false
    })
    .option('preview', {
        alias: 'p',
        describe: 'Show preview URL',
        type: 'boolean',
        default: false
    })
    .option('silent', {
        alias: 's',
        describe: 'Only output the shortened URL',
        type: 'boolean',
        default: false
    })
    .option('format', {
        alias: 'f',
        describe: 'Output format',
        choices: ['text', 'json'],
        default: 'text'
    })
    .help('h')
    .alias('h', 'help')
    .example('$0 --url https://example.com', 'Shorten URL')
    .example('$0 --url https://example.com --qr', 'Shorten URL and get QR code link')
    .argv;

function shortenUrl(url, options, callback) {
    const tinyApiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;

    https.get(tinyApiUrl, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                const result = {
                    original: url,
                    shortened: data,
                    qr: options.qr ? `https://api.qrserver.com/v1/create-qr-code/?size=${options.qrSize}x${options.qrSize}&data=${encodeURIComponent(data)}` : null,
                    preview: options.preview ? `https://tinyurl.com/preview.php?num=${data.split('/').pop()}` : null
                };
                callback(null, result);
            } else {
                callback(new Error(`Failed to shorten URL. Status code: ${response.statusCode}`));
            }
        });

    }).on('error', (error) => {
        callback(error);
    });
}

shortenUrl(argv.url, argv, (error, result) => {
    if (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }

    if (argv.format === 'json') {
        console.log(JSON.stringify(result, null, 2));
    } else if (argv.silent) {
        console.log(result.shortened);
    } else {
        console.log('Original URL:', result.original);
        console.log('Shortened URL:', result.shortened);
        if (result.qr) console.log('QR Code URL:', result.qr);
        if (result.preview) console.log('Preview URL:', result.preview);
    }
});