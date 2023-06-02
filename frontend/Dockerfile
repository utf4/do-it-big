# Stage 1: Build the Angular application
FROM node:16
SHELL ["/bin/bash", "-c"]
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY . /app/
# Install the application dependencies
RUN npm install
RUN npm install -g @angular/cli
# Build the Angular application
RUN npm run build 
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]