FROM node:14-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:14-alpine as build_prod_deps

WORKDIR /app

COPY --from=build /app/package.json ./

COPY --from=build /app/yarn.lock ./

COPY --from=build /app/node_modules ./node_modules

RUN yarn --frozen-lockfile --production

FROM node:14-alpine as prod

ARG PORT=5000

ENV PORT=${PORT}

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build_prod_deps /app/node_modules ./node_modules

CMD ["node", "dist/main"]
