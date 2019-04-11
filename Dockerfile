FROM node:latest
WORKDIR /usr/app

COPY . .

# If you are building your code for production
# RUN npm ci --only=production
RUN npm set unsafe-perm true
RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]