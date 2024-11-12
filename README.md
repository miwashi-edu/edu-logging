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

### Taila loggen

```bash
tail -f server.log
```

