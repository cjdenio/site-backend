FROM node:12.20.1

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV production

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
