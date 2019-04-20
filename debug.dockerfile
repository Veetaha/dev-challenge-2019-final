FROM node:latest
WORKDIR /home/${USER}/my/projects/dev-challenge-2019-final

COPY . .

# workaround npm install --prefix warning
RUN npm set unsafe-perm true 

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]