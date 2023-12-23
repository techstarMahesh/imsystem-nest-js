# Setup Commands

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Lint

```bash
npm run lint
```

## TypeORM CLI

```bash
npm run migration:generate ./src/database/migrations/$name
```

```bash
npm run migration:create ./src/database/migrations/$name
```

```bash
npm run migration:revert
```

```bash
npm run migration:run
```
