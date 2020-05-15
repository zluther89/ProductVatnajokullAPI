FROM node

WORKDIR /sdc/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3005

CMD [ "node", "index.js" ]
