# urlshortener
example to practice writing CLI and using asynchronous coding patterns

## Running the app
There are three versions of this app, but run the installation first:
```
npm install
```
Each of the following examples use example.com and use the --url and --qr flag to create a short link and a QR code respectively

To run the callback version:
```
node yargsCallbacksShortener.js --url https://example.com --qr
```

To run the Promise version:
```
node yargsPromiseShortener.js --url https://example.com --qr
```

To run the Async/Await version:
```
node yargsAsyncAwaitShortener.js --url https://example.com --qr
```

Additionally use the --help flag to get more information about these CLI scripts. Each version works the same way, but uses a different async coding pattern.

These examples use [yargs](https://www.npmjs.com/package/yargs) which is an NPM package that enables the use of CLI flags.

## Things to try out
1. Run each of the three versions (using different flag options and URLs) and review the code to get a sense how each pattern is written to accomplish the same task. Note down what pros and cons you can see with each pattern.
2. Attempt to abstract out the yargs portion common to all three versions into a separate module.
3. Add a small feature and see if you can apply this feature identicall across all three versions. Some feature ideas:
- Saving the short link to an output file (text or json)
- Check if the URL is valid (hint use fetch or axios)
- add an expiry to the short URL (hint: https://tinyurl.com/app/dev)

