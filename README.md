# Skyscan Backend

## Nest JS

### Initialisation

```sh
npm i -g @nestjs/cli
nest new skyscan-backend
```

### Run locally

```sh
cd skyscan-backend
npm install
npm run start
```

## Postgres DB

### Docker commands

Make sure to create and complete a `.env` with the given variables from the `.env.example` in the root folder of the project.
Use default postgres credentials, if needed reset password with psql.

```sh
# run docker compose
docker compose up

```