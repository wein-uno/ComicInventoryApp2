# Build stage
FROM node:18-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage: use a lightweight web server to serve the compiled React app
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# Nginx will serve at port 80 by default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
