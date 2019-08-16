FROM node:10

RUN mkdir -p /app/envolution

WORKDIR /app/envolution

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080

CMD ["npm", "run", "dev"]