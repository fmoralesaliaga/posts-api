FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# For development
FROM node:20-alpine AS development
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# For production
FROM node:20-alpine AS production
WORKDIR /app

# Set NODE_ENV
ENV NODE_ENV=production

# Copy from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env* ./

# Expose port
EXPOSE 3001

# Start server
CMD ["npm", "run", "start"]