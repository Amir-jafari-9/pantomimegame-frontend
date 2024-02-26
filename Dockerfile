FROM node:21-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

RUN npm run build

USER node

CMD ["npm", "start"]
