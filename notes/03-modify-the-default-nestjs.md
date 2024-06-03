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
