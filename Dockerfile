FROM node:20-alpine

WORKDIR /app

COPY package* ./

RUN npm install

COPY ./prisma ./

# RUN npx prisma migrate deploy

RUN npx prisma generate

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["node","dist/index.js"]