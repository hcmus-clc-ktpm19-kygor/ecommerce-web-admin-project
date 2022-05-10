FROM node:lts-alpine
WORKDIR /app/admin
ADD package*.json /.
RUN npm install
ADD . .
CMD npm start