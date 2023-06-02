# Use Ubuntu 22.04 as the base image
# Use a Node.js base image with a specific version
FROM node:16-alpine
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY . /app
# Install the application dependencies
RUN npm install

