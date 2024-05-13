# Workshop :: Auth Service
* Backend = NodeJS
* Database = SQLite

### Steps to run
```
cd auth-service
npm install
node server.js
```

### List of endpoints
* http://localhost:3001
* API documentation
  * http://localhost:3001/api-docs/

### Testing workshop
* API testing
* UI testing
* Manage depedencies


### Run testing with jest
* Intial data for test
* Run all tests
```
npm run initDataTest
npm test
```

### Run only e2e test
```
npm run initDataTest
npm run e2e-test
```

### Run only component test with test double
```
npm run component-test
```

### Run only integration test with test double
```
npm run integration-test
```

### Run only unit test with test double
```
npm run unit-test
```