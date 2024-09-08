# Stage 1: Build the app
FROM node:18.14.2 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npx nuxt build

# Stage 2: Create a lean production image
FROM node:18.14.2

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

RUN yarn install

EXPOSE 3000

# Start the application
CMD ["node", "./.output/server/index.mjs"]