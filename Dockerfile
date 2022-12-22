FROM node:16.15.0

WORKDIR /business-front

COPY ["package.json", "package-lock.json*", "/"]

RUN npm install

COPY ./ ./

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "start"]

