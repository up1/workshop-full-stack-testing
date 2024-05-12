# Workshop
* Frontend = ReactJS
* Backend = NodeJS
* Database = MySQL


## Workshop with Backend (REST API)
* NodeJS
* Express
* Sequelize
* Database = MySQL

### Simple run api
```
cd api
npm install
node server.js
```

### Run with Docker
```
docker compose build
docker compose up -d
docker compose ps
NAME                        IMAGE                     COMMAND                  SERVICE   CREATED          STATUS                    PORTS
react-express-mysql-api-1   react-express-mysql-api   "docker-entrypoint.s…"   api       22 seconds ago   Up 10 seconds (healthy)   0.0.0.0:8080->8080/tcp
react-express-mysql-db-1    mysql:8.4.0               "docker-entrypoint.s…"   db        22 seconds ago   Up 21 seconds (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp
```

### List of endpoints
* http://localhost:8080
* API documentation
  * http://localhost:8080/api-docs/

## Testing
* API Testing
  * External
    * Postman + newman
    * Test container
  * Internal
    * Jest
    * Super test
    * Test container
* Unit testing
    * Jest
    * Jest mock