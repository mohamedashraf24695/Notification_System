FROM node:14 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as test
RUN npm install
COPY . .
CMD [ "npm", "run", "test" ]

FROM base as prod
RUN npm install
COPY . .
CMD [ "node", "app.js" ]