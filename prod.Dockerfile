FROM node:12.20.1

WORKDIR /usr/src/app

COPY . .

RUN yarn install

CMD ["yarn", "start"]
