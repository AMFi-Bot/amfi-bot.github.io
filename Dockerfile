# Build the project
FROM node:18-alpine as builder

WORKDIR /app

# Copy files
COPY src ./src
COPY public ./public
# COPY .yarn/patches .
COPY .yarn/plugins .
COPY .yarn/releases .
COPY .yarn/sdks .
# COPY .yarn/versions .
COPY .yarnrc.yml .
COPY env.d.ts .
COPY index.html .
COPY package.json .
COPY tsconfig.* .
COPY vite.config.ts .
COPY yarn.lock .

# Install dependencies
RUN yarn install --production

# Build
RUN yarn run build-only

# Host the project through nginx
FROM nginx:alpine as server
COPY ./.nginx/nginx.conf /etc/nginx/
COPY ./.nginx/conf.d /etc/nginx/conf.d

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]