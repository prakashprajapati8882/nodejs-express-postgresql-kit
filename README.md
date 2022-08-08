# NodeJs Express PostgreSql Startup Kit

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

2. Install packages Dependencies
    ```cmd
    npm i
    ```

3. Run server start command 
    ```cmd
    npm run start
    ```