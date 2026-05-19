# ─── Multi-stage Dockerfile for NestJS backend ────────────────
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# Generate Prisma Client BEFORE building so TypeScript has the types
RUN npx prisma generate

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Run database migrations then start app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
