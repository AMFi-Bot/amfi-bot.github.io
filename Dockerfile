# Build the project
FROM node:18-alpine as builder

WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN yarn install --production

# Build
RUN yarn run build-only

# Host the project through nginx
FROM nginx:alpine as server
COPY ./.nginx/conf /etc/nginx/

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]