# Demo Blog app with NuxtJS
* NuxtJS
* Tailwind
* State management with Pinia
* Working with API (axios) + OpenAPI
* Testing
* Working with Docker

## Run project

Run
```
npm run dev
```

Upgrade version
```
npx nuxi upgrade --force
```

Clear cached
```
npx nuxi cleanup .
```

## Generate type from OpenAPI
```
npx openapi-typescript ./postman/openapi.yml -o ./openapi.gen.ts
```

## Run with Docker
```
docker compose build
docker compose up -d
docker compose ps
```

## [Workshop :: Testing](https://github.com/up1/workshop-full-stack-testing/wiki/UI%E2%80%90testing%E2%80%90workshop)
* Playwright
* Robot framework