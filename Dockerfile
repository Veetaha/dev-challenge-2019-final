FROM node:latest
WORKDIR /usr/app

COPY . .

# workaround npm install --prefix warning
RUN npm set unsafe-perm true 

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]