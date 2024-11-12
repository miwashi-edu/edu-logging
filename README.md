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

## Morgan

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

## Winston

### logger.js

```js
const winston = require('winston');
require('dotenv').config();

const logLevel = process.env.LOG_LEVEL || 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'application.log' })
  ]
});

### app.js

module.exports = logger;
```

```js
require('dotenv').config();
const express = require('express');
const logger = require('./logger');

const app = express();

logger.info('Express application is starting up...');
app.use('/api/user', require('./routes/user_routes.js'));

app.get('/api/test', (req, res) => {
  logger.info('Test route accessed');
  res.send('Logging is working!');
});

module.exports = app;
```

### Log levels in Winston

```js
logger.debug('This is a debug message');    // Detailed, low-level info for development
logger.info('User logged in successfully'); // General information about application events
logger.warn('Memory usage is high');        // Potential issue to keep an eye on
logger.error('Failed to connect to database'); // Serious issue that requires attention
```
