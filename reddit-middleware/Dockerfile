FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

EXPOSE 4000
 ## ENTRYPOINT [ "yarn","start" ]
 CMD /wait && yarn start