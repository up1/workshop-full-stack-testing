# Workshop :: Product Service
* Backend = NodeJS

### Steps to run
```
cd product-service
npm install
node server.js
```

### List of endpoints
* http://localhost:3002
* API documentation
  * http://localhost:3002/api-docs/

### Testing workshop
* API testing

### Run all tests
```
npm test
```

### E2E tests
```
npm run e2e-test
```

### Working with BDD (Behavior-Driven Development)

Install
```
$npm install cucumber -D
```

Edit file `package.json`
```
"scripts": {
    
    "bdd": "cucumber-js **/features/product-list.feature"
}
```

Create feature file in `__tests__/bdd/features/product-list.feature`
```
Feature: Products List
    Scenario: Load the products list
        When we request the products list
        Then we should receive
            | name           | description            |    price  |
            | product 1       | product 1 description |    100    |
            | product 2       | product 1 description |    200    |
            | product 3       | product 1 description |    300    |  
```

Run test
```
$npm run bdd
```
