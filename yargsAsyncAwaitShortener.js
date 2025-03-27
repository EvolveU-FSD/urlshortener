#!/usr/bin/env node
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

async function shortenUrl(url, options) {
    const tinyApiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(tinyApiUrl);
    
    if (!response.ok) {
        throw new Error(`Failed to shorten URL. Status code: ${response.status}`);
    }
    
    const shortened = await response.text();
    
    return {
        original: url,
        shortened,
        qr: options.qr ? `https://api.qrserver.com/v1/create-qr-code/?size=${options.qrSize}x${options.qrSize}&data=${encodeURIComponent(shortened)}` : null,
        preview: options.preview ? `https://tinyurl.com/preview.php?num=${shortened.split('/').pop()}` : null
    };
}

// Using IIFE to use async/await in top-level code
(async () => {
    try {
        const result = await shortenUrl(argv.url, argv);
        
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
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
})();