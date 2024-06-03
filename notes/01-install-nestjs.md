# Step 1: Install Nest.js

[^ Notes](./00-notes.md)

## Initial installation

Based on the [NestJS docs,](https://docs.nestjs.com/#installation) install the
Nest CLI:

```bash
npm i -g @nestjs/cli
# added 281 packages in 16s
# 63 packages are looking for funding
#   run `npm fund` for details
nest --version
# 10.3.2
nest new gus --strict # the '--strict' flag chooses TypeScript's stricter feature set
# ⚡  We will scaffold your app in a few seconds..
# ? Which package manager would you ❤️ to use? (Use arrow keys)
# ❯ npm
#   yarn
#   pnpm
npm
# CREATE gus/.eslintrc.js (663 bytes)
# CREATE gus/.prettierrc (51 bytes)
# CREATE gus/README.md (3340 bytes)
# CREATE gus/nest-cli.json (171 bytes)
# CREATE gus/package.json (1942 bytes)
# CREATE gus/tsconfig.build.json (97 bytes)
# CREATE gus/tsconfig.json (546 bytes)
# CREATE gus/src/app.controller.ts (274 bytes)
# CREATE gus/src/app.module.ts (249 bytes)
# CREATE gus/src/app.service.ts (142 bytes)
# CREATE gus/src/main.ts (208 bytes)
# CREATE gus/src/app.controller.spec.ts (617 bytes)
# CREATE gus/test/jest-e2e.json (183 bytes)
# CREATE gus/test/app.e2e-spec.ts (630 bytes)
# ✔ Installation in progress... ☕
# 🚀  Successfully created project gus
# 👉  Get started with the following commands:
# $ cd gus
# $ npm run start
#                           Thanks for installing Nest 🙏
#                  Please consider donating to our open collective
#                         to help us maintain this package.
#                🍷  Donate: https://opencollective.com/nest
cd gus
npm start
# > gus@0.0.1 start
# > nest start
# [Nest] 66643  - 03/06/2024, 20:40:57     LOG [NestFactory] Starting Nest application...
# [Nest] 66643  - 03/06/2024, 20:40:57     LOG [InstanceLoader] AppModule dependencies initialized +21ms
# [Nest] 66643  - 03/06/2024, 20:40:57     LOG [RoutesResolver] AppController {/}: +7ms
# [Nest] 66643  - 03/06/2024, 20:40:57     LOG [RouterExplorer] Mapped {/, GET} route +3ms
# [Nest] 66643  - 03/06/2024, 20:40:57     LOG [NestApplication] Nest application successfully started +6ms
```

And in another Terminal window:

```bash
curl http://localhost:3000/
# Hello World!
```

The gus/ folder is 155,291,719 bytes (210.1 MB on disk) for 20,117 items.

## Run Jest tests, and generate a coverage report

```bash
npm test
# > gus@0.0.1 test
# > jest
#  PASS  src/app.controller.spec.ts
#   AppController
#     root
#       ✓ should return "Hello World!" (36 ms)
# Test Suites: 1 passed, 1 total
# Tests:       1 passed, 1 total
# Snapshots:   0 total
# Time:        4.235 s, estimated 5 s
# Ran all test suites.
npm run test:cov
# > gus@0.0.1 test:cov
# > jest --coverage
#  PASS  src/app.controller.spec.ts
#   AppController
#     root
#       ✓ should return "Hello World!" (22 ms)
# -------------------|---------|----------|---------|---------|-------------------
# File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
# -------------------|---------|----------|---------|---------|-------------------
# All files          |   54.16 |      100 |      75 |      50 |
#  app.controller.ts |     100 |      100 |     100 |     100 |
#  app.module.ts     |       0 |      100 |     100 |       0 | 1-10
#  app.service.ts    |     100 |      100 |     100 |     100 |
#  main.ts           |       0 |      100 |       0 |       0 | 1-8
# -------------------|---------|----------|---------|---------|-------------------
# Test Suites: 1 passed, 1 total
# Tests:       1 passed, 1 total
# Snapshots:   0 total
# Time:        12.339 s
# Ran all test suites.
open gus/coverage/lcov-report/index.html
```

## Move the generated NestJS files to the top level

I just copy-pasted the 'Installation' and 'Running the app' sections from
gus/README.md into the preexisting top level README.md file.

I added some lines to the gus/.gitignore file:

```
# See http://help.github.com/ignore-files/ for more about ignoring files.
...
Thumbs.db
...
# Private
firestore-json-key-*.json
```

I also added some info near the top of the generated gus/packages.json file:

```json
{
  "name": "gus",
  "version": "0.0.1",
  "description": "A generic user server, based on Nest.js, Express and...",
  "author": "Rich Plastow",
  "private": false,
  "license": "MIT",
  ...
}
```

```bash
mv gus/README.md notes/02-nestjs-default-readme.md
mv gus/* . # move visible...
mv gus/.[!.]* . # ...and invisible items
rmdir gus
```
