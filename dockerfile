FROM node:22-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
CMD [ "npm", "start" ]