FROM cypress/included:15.7.1 AS test
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run e2e-test

FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json .
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["node", "node node_modules/next/dist/bin/next start -p 3000"]
