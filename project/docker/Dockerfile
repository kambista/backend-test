FROM node:15

RUN mkdir /code
WORKDIR /code
COPY dist/ .
COPY ormconfig.json .
COPY package.json .
RUN npm install
EXPOSE 3000
CMD [ "node", "dist/index.js" ]