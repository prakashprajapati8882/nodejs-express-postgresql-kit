# nodejs-express-postgresql-kit

### Configuration

After checkout of a repository, please perform the following steps in exact sequence:


1. Create `.env` file and add follong information 
    ```sh
        # Server Port Information
        HTTPS_PORT=443
        HTTP_PORT=80

        # Database Information
        DB_HOST='database_host'
        DB_PORT='database_port'
        DB_USER='database_username'
        DB_PASS='database_password'
        DB_NAME='database_name'
        DB_DIALECT=postgres
    ```

    Remember to fill up required values in `.env`

2. Run `npm i`

3. Run server start command 
    ```sh
    npm run start
    ```

##

# Folder Structure for Boiler plate
```YAML
    nodejs-boilerplate/
    ├─ src/
    │  ├─ app/
    │  │  ├─ users/
    │  │  │  ├─ users.controller.js
    │  │  │  ├─ users.request.js
    │  │  │  ├─ users.route.js
    │  │  │  ├─ users.service.js
    │  ├─ database/
    │  │  ├─ config/
    │  │  │  ├─ config.js
    │  │  ├─ migrations/
    │  │  │  ├─ 20220712113911-create-users-table.js
    │  │  ├─ models/
    │  │  │  ├─ users.model.js
    │  │  ├─ services/
    │  │  │  ├─ run-migration-seeders.js
    │  │  │  ├─ sequlize.js
    │  │  ├─ database-connection.service.js
    │  ├─ logger/
    │  │  ├─ logger.js
    │  ├─ middlewares/
    │  │  ├─ api-logger.middleware.js
    │  │  ├─ error-handler.middleware.js
    │  │  ├─ error-response-handler.middleware.js
    │  │  ├─ response-handler.middleware.js
    │  ├─ services/
    │  │  ├─ error-class.js
    │  │  ├─ thow-error-class.js
    │  ├─ ssl/
    │  │  ├─ ssl.service.js
    │  ├─ utilities/
    │  │  ├─ server-utill.js
    │  ├─ app.js
    │  ├─ server.js
    ├─ .gitignore
    ├─ .sequelizerc
    ├─ index.js
    ├─ package.json
    ├─ README.md

```