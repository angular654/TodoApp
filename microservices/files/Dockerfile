FROM node:14


WORKDIR /usr/src/files


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050
CMD [ "node", "index.js" ]