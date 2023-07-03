FROM node:14
WORKDIR /app-cds
EXPOSE 3000
COPY . .
RUN npm install
ENTRYPOINT npm start