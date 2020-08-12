FROM node:12.18.2-slim

WORKDIR /usr/app/node-for-enterprise
COPY . .
RUN yarn

EXPOSE 9527
CMD yarn start
