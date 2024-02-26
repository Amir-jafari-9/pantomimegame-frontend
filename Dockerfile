FROM node:21-alpine AS base

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build


# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./

USER node

CMD ["npm", "start"]