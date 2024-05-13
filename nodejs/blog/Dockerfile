FROM node:18-alpine3.19 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine3.19
WORKDIR /app
COPY --from=build-stage /app/.output /app/
CMD [ "node", "/app/server/index.mjs" ]