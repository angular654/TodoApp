FROM node:14


WORKDIR /usr/src/todos


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6060
CMD [ "node", "index.js" ]