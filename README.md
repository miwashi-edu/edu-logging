# edu-logging

## Logga till fil.

### Node Util 
[Node Util](https://nodejs.org/api/util.html)

### Ersätt console med egen funktion.

```js
const fs = require('fs');
const util = require('util');

const logFile = fs.createWriteStream('server.log', { flags: 'a' });

console.log = function(message) {
    logFile.write(`${new Date().toISOString()} - ${util.format(message)}\n`);
};
```

### Använd loggen

```js
app.listen(PORT, () => {
    console.log(`HTTP server listening on port ${PORT}`);
});
```

### Taila loggen

```bash
tail -f server.log
```

## Winston

### Till consoll

```js
const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('tiny'));
//app.use(morgan('short'));
//app.use(morgan('dev'));
//app.use(morgan('combined'));
//app.use(morgan('common'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

module.exports = app;
```

### Till fil

```js
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
```
