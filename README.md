## Run Project Setup with docker

---

## Steps To Perform

1. Clone the repository by executing the following command in the terminal. And run `cp .env.example .env` command on root of the cloned repository.

```
    git clone  <replace it with the link of provided repository>
```

2. Install docker and start the services. 
3. Run the following command in the terminal

```
   docker-compose up
```

4. Wait for a few seconds (depends on internet connection) for docker images to build (frontend, backend, postgres, localstack)

5. SignUp to localstack dashboard by following the provided link: https://app.localstack.cloud/ to register the email identities under `Resource/SES Identities` tab.

   ```json
   Emails (Seed in database)
   1. john@example.com
   2. jane@example.com
   3. mickel@example.com

   ```

6. Open the link: http://localhost:4200 in a browser to run the application.
7. Hit backend health Check endpoint http://localhost:3000/ in a browser just in case to confirm if backend configured successfully.

8. Login to system by using any of the following credentials that already seeded in database with migration run command.

   ```json
   1. Email: john@example.com
      Password: 12345678

   2. Email: jane@example.com
      Password: 12345678

   3. Email: mickel@example.com
      Password: 12345678
   ```

## Run Project Setup without docker

---

#### Pre Requisites:

- NodeJS 16.0.0
- npm
- brew
- PostgreSQL
- Docker (To run localstack services)

## Steps To Perform

1. Clone the repository by executing the following command in the terminal.

   ```
    git clone  <replace it with the link of provided repository>
   ```

### For Backend

1. Setup the postgreSQL database connection and create a db with the credentials provided in `.env.example` file.

2. Execute the following command in the terminal.

   ```
       cd backend
       npm run install
       cp .env.example .env
       npm run migration:run
       npm run start:dev
   ```

3. Install docker and start the services.

4. In a separate terminal tab run the localstack services by executing following command to simulate AWS SES.

   ```
       localstack start
   ```

5. Hit backend health Check endpoint http://localhost:3000/ in a browser just in case to confirm if backend configured successfully.

6. Login to system by using any of the following credentials that already seeded in database with migration run command.

   ```json
   1. Email: john@example.com
      Password: 12345678

   2. Email: jane@example.com
      Password: 12345678

   3. Email: mickel@example.com
      Password: 12345678
   ```

### For Frontend

1. Execute the following command in the terminal.

        cd frontend
        npm run install

## To start frontend

    ng serve

​
