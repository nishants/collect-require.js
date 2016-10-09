# collect-require
- Converts a require-js based code into standalone scripts for browsers and Rhino/Nashorn Engine.
- Keeps the generated code as close as possible to real code base.
- Doest not support requiring other npm modules

### Usage
```javascript
var collector = require("collect-require"),
    baseDir   = "src",
    main      = "index.js",
    output    = "dist/jeyson.js";

collector.collect(baseDir).save({
  path    : output,
  main    : main ,
  apiName : "Jeyson",
});

```

### Development

- Run Test
```bash
npm run test
```