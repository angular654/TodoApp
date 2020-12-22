FROM node:14


WORKDIR /usr/src/auth


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4040
CMD [ "node", "index.js" ]