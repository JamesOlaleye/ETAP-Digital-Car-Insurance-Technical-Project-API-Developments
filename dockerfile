FROM node:20

ENV NODE_ENV="production"

ENV PORT=3225

RUN npm install -g @nestjs/cli

RUN npm install -g prisma

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN prisma generate 

RUN yarn build

EXPOSE 3225

CMD ["yarn", "start:prod"]