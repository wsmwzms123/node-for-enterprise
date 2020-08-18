FROM node:12.18.2

WORKDIR /usr/app/node-for-enterprise
COPY . .
RUN yarn

EXPOSE 000
CMD yarn start:prod
