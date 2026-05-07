FROM node:22-alpine AS builder
WORKDIR /app

COPY web/frontend/package*.json ./
RUN npm ci

COPY web/frontend ./
ARG VITE_API_BASE_URL=http://localhost:8000/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

EXPOSE 4173
CMD ["node", "build"]
