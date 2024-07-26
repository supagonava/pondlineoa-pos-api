# Use an official Node runtime as a parent image
# docker build --platform linux/amd64 . -t kaoprogramerapi:latest
FROM node:18-alpine

# Set the working directory
WORKDIR /app

COPY . .

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY .env .env

# Install dependencies
RUN yarn install

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:prod"]
