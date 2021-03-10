FROM node:14

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV production
ARG DATABASE_URL=${DATABASE_URL}

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
