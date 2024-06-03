# Step 3: Modify the default NestJS

[^ Notes](./00-notes.md)

## Change `GET /` from "Hello World!" to "ok"

Start the server in development 'watch' mode, where changes to source files will
automatically restart the server:

```bash
npm run start:dev
# [23:39:45] Starting compilation in watch mode...
# [23:39:49] Found 0 errors. Watching for file changes.
# [Nest] 71456  - 03/06/2024, 23:39:50     LOG [NestFactory] Starting Nest application...
# [Nest] 71456  - 03/06/2024, 23:39:50     LOG [InstanceLoader] AppModule dependencies initialized +14ms
# [Nest] 71456  - 03/06/2024, 23:39:50     LOG [RoutesResolver] AppController {/}: +12ms
# [Nest] 71456  - 03/06/2024, 23:39:50     LOG [RouterExplorer] Mapped {/, GET} route +3ms
# [Nest] 71456  - 03/06/2024, 23:39:50     LOG [NestApplication] Nest application successfully started +2ms
```

In src/app.service.ts change `'Hello World!'` to `'ok'` and `getHello()` to
`anonTopLevelRoot()`:

```ts
...
  anonTopLevelRoot(): string {
    return 'ok';
  }
...
```

In src/app.controller.ts change `getHello()` to `anonTopLevelRoot()`:

```ts
import { Controller, Get, Header } from '@nestjs/common';
...
  @Get()
  @Header('content-type', 'text/plain')
  anonTopLevelRoot(): string {
    return this.appService.anonTopLevelRoot();
  }
...
```

Update the src/app.controller.spec.ts and test/app.e2e-spec.ts files:

```ts
...
    it('should return "ok"', () => {
      expect(appController.anonTopLevelRoot()).toBe('ok');
    });
...
```

```ts
...
  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200)
      .expect('ok');
  });
...
```

> [The supertest docs](https://www.npmjs.com/package/supertest#api) explain how
> to test the 'Content-Type' header, using `.expect(field, value[, fn])`.

In another Terminal window:

```bash
npm test # runs the src/app.controller.spec.ts unit test
# > gus@0.0.1 test
# > jest
#  PASS  src/app.controller.spec.ts
#   AppController
#     root
#       ✓ should return "ok" (15 ms)
# Test Suites: 1 passed, 1 total
# Tests:       1 passed, 1 total
# Snapshots:   0 total
# Time:        3.997 s
# Ran all test suites.
npm run test:e2e # runs the test/app.e2e-spec.ts end-to-end test
# > gus@0.0.1 test:e2e
# > jest --config ./test/jest-e2e.json
#  PASS  test/app.e2e-spec.ts
#   AppController (e2e)
#     ✓ GET / (281 ms)
# Test Suites: 1 passed, 1 total
# Tests:       1 passed, 1 total
# Snapshots:   0 total
# Time:        4.293 s, estimated 5 s
# Ran all test suites.
```

## Configure VS Code to apply Prettier and ESLint rules

Prettier and ESLint can be configured to suit your preferred code formatting
style. Currently the .prettierrc file in the top level is:

```json
{
    "singleQuote": true,
    "trailingComma": "all"
}
```

Running `npm run lint` doesn't change any files.

> The Prettier configuration file is
> [documented here.](https://prettier.io/docs/en/configuration.html)

Change the .prettierrc file to:

```json
{
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "all"
}
```

```bash
npm run lint
# > gus@0.0.1 lint
# > eslint "{src,apps,libs,test}/**/*.ts" --fix
# =============
# WARNING: You are currently running ...
# ...
# =============
```

You should see that .ts files in src/ and test/ have had their indents changed
from 2 to 4 spaces.

If you manually edit one of those files, to give a line incorrect indenting,
there are no red squiggly underlines, and the filename does not turn red in
VS Code's 'EXPLORER' sidebar.

Install the "dbaeumer.vscode-eslint" extension - you should see the red errors
appear. When you hover it should say "Insert \`··\` eslint(prettier/prettier)"

Save the file - ESLint and Prettier rules are not applied yet.

Create this .vscode/settings.json file:

```js
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

Now the bad indents will be automatically fixed when the file is saved.

> Using `"source.fixAll.eslint": true ` instead of `"source.fixAll": true`
> prevents VS Code from automatically deleting unreachable code after a `return`
> statement, which can be annoying during development.

In .eslintrc.js on the top level, add a `rule` so that unreachable code is still
highlighted, even though it doesn't automatically get fixed:

```js
...
    rules: {
        'no-unreachable': 'warn',
        '@typescript-eslint/interface-name-prefix': 'off',
...
```

```bash
npm run lint
# > gus@0.0.1 lint
# > eslint "{src,apps,libs,test}/**/*.ts" --fix
# ...
# =============
# .../gus/src/main.ts
#   7:5  warning  Unreachable code  no-unreachable
# ✖ 1 problem (0 errors, 1 warning)
```

At this stage you'll notice that saving most files, including Markdown, will
cause some formatting to be automatically updated. For example, trailing spaces
at the end of lines are removed. Also, a newline is added to the end of most
kinds of files, if missing. I went through and manually saved all the
(non-git-ignored) files in the repo - I'm not sure if there's an automatic way
to do that.
