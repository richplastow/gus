# Gus

> A generic user server, based on Nest.js, Express and Node, which manages user auth and accounts for multiple domains at once.

- Created 20240603
- Rich Plastow
- <https://github.com/richplastow/gus>

Primarily intended to be run as an AWS App Runner instance, connected to
a Google Firestore database.

- A single __Gus__ instance can serve multiple unrelated apps
- Handles user authentication and credentials
- Can send emails to confirm sign-up, or to reset passwords
- Provides CRUD for user account/profile data, app-usage statistics, and more
- 'superadmin' access, for managing all apps in once place

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Endpoints

### Anonymous, top-level endpoints

__`GET /`__

Responds with just two bytes, `ok`. All other endpoints use `application/json`
for their response `Content-Type`, but this endpoint uses `text/plain` instead.
Useful for AWS App Runner to 'ping' every 20 seconds, to show the app's running.
