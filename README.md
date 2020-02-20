# node_api_example
API server example code.  Code development using variety Module.
- node API server
- TDD(Test-driven development)
- Refactoring

# Using Module
- Express.js, body-parser
- mocha, should, superTest

# Setup
1. git clone
``` bash
> git clone https://github.com/ChangRaeJoe/node_api_example
``` 
2. package install
``` bash
> node init
``` 
3. config

4. server start
``` bash
> npm start
or
> node index.js
```

# config
write code in config directory > sequelize.json
```json
{
    "test": {
        "username": "DBName", 
        "password": "password",
        "database": "DBTableName",
        "host": "hostName",
        "dialect": "mysql", //your dbms
        "operatorsAliases": false,
        "logging": false    //db logging flag
    }
}
```

# package.json
```json
{
    ...
    "scripts": {
        "start": "set NODE_ENV=sequelize.json Propertie&&node ./bin/www.js",
        "test": "set NODE_ENV=sequelize.json Propertie&&mocha ./api/*/*.spec.js"
    },
    ...
}
```

# License
MIT

# ToDo
1. TDD module setup
2. API Design
3. DB connect, ORM, Model
4. heroku platform  