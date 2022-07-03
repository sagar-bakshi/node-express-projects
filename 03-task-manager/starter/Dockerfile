FROM node:latest

RUN mkdir -p /app

WORKDIR /app

copy . .

RUN npm install

EXPOSE 80

CMD ["npm", "start"]