#build nuxt .output
FROM node:20-alpine as frontend-build

WORKDIR /src

COPY package.json ./

RUN apk update

ENV TZ=Asia/Bangkok

RUN yarn cache clean
RUN yarn install

ADD . ./

RUN yarn build

# running image
FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
# copy from build
COPY --from=frontend-build /src/.output /app/.output

# Clear the cache
RUN yarn cache clean

USER node
EXPOSE 3000
CMD [ "node", ".output/server/index.mjs"]
