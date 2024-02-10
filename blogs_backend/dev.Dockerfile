# FROM 
# --platform=linux/amd64 node:16
FROM node:16

WORKDIR /usr/src/app

# COPY package*.json .

COPY . .

RUN npm install && \
npm rebuild bcrypt --build-from-source

CMD ["npm", "run", "dev"]