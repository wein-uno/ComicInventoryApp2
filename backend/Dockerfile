# Use a Node.js LTS base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install

# Copy rest of the application files
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
