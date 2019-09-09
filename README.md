# envolution-server

Envolution is a platform that connects environmental organizations with volunteers striving to make an impact on climate change. Based on their geolocation, this PWA matches volunteers with projects that reflect their specific ecological interests. 

## Screenshots
<p align="center">
    <img src="https://i.imgur.com/9ZmaQDt.png" width="600px" />
</p>

## Getting started

This is the back-end repository. The front-end can be found at [GitHub](https://github.com/jonas-wedemeyer/envolution-client)

### Installation

#### Pre-requisites

To use the Envolution server consider the following: 

1. Begin by forking this repository, and cloning it to your computer with the following command: 

 ```bash
   git clone https://github.com/jonas-wedemeyer/envolution-server.git
 ```

2. For macOS users, use Homebrew to install PostgreSQL. Install and start PostgreSQL on your machine by entering the two commands below in your terminal:

```bash
  brew install postgres
  brew services start postgres
```

For Windows users please refer to the following site to install PostgreSQL: https://www.postgresql.org/download/windows/

3. Set the environment variables in the `example.env` file. You can leave the `NODE_ENV` and `DB_NAME` set to`production` and `envolution` correspondingly. Create a password and set it to `JWT_SECRET`. The DB_USR and DB_PASS variables correspond to your PostgreSQL account username and password.

```bash
  NODE_ENV=production
  SERVER_PORT=
  JWT_SECRET=

  DB_USR=
  DB_PASS=
  DB_NAME=envolution
  DB_HOST=db
```
4. After cloning the repo you'll have to decide whether or not to use Docker to run the server. Below you’ll find the steps for running the server with or without Docker.

###With Docker

1.  Start running Docker on your machine

2.  In the `example.env` file set the variable `DB_HOST` to `db`

3. Rename the `example.env` file to `.env` and save the file

4. Open your terminal and enter the command 

```bash
  docker-compose up --build
```

5. Once Docker is running open a new terminal window and enter the command below to start PostgreSQL, replacing `username` with your PostgreSQL username 

```bash
  psql -h localhost -p 5432 -U username envolution
```

6. To seed the database, open a new terminal window and enter the following script 

```bash
  bash scripts/seed-db.sh
```

###Solving potential errors when running Docker: 
-  If you get an error regarding Sequelize that indicates port `5432` is already in use, change the host port within the `docker-compose.yml` file from `5432` to a number above 3000, for instance `4000`. The final result will be the following: 
```bash
  ports: 
    - 4000:5432
```
- If you get an error regarding exisiting node modules, specifically bcrypt, clean your Docker containers, images, and build cache with the Docker command below. For more information on this refer to Docker documentation: https://docs.docker.com/engine/reference/commandline/system_prune/

```bash
  docker system prune 
```

###Without Docker

1.  In the `example.env` file set the variable `DB_HOST` to `db`

2. Rename the `example.env` file to `.env` and save the file

3. Start PostgreSQL, create a new database, and connect to it with the following commands:

```bash 
  psql postgres
  postgres=# CREATE DATABASE envolution;
  postgres=# \c envolution;
```

Your bash should now look like this:

```bash
  envolution=# 
```

4. Set a password for the current PostgreSQL user with the following command:

```bash
  envolution=# ALTER USER <user_name> WITH PASSWORD 'new_password';
```

5. Run the server with the following:

```bash
  npm run dev
```

6. To seed the database, open a new terminal window and enter the following: 

```bash
  npm run seed:all
```

## Tech Stack

* Koa
* Sequelize
* PostgreSQL
* JWT
* Docker

##Developers 

* Coralie Daccord - [GitHub](https://github.com/Coralie19) -[LinkedIn](https://www.linkedin.com/in/coralie-daccord)
* Alexa Schaeffer Quintero - [GitHub](https://github.com/miquintero) - [LinkedIn](https://www.linkedin.com/in/alexa-schaeffer-quintero)
* Jonas Wedemeyer - [GitHub](https://github.com/jonas-wedemeyer) - [LinkedIn](https://www.linkedin.com/in/jonas-wedemeyer)