# Build
FROM node:10-alpine as builder

# Git needed for social packages
RUN apk update && \
	apk add --no-cache git

WORKDIR /app

COPY ./package.json ./package-lock.json  ./

RUN npm ci --no-optional

## Copy folders
COPY ./config ./config
COPY ./sources ./sources
COPY ./typings ./typings

## Copy required files
COPY ./tsconfig.json ./

RUN ls -lah

RUN npm run bundle

# Nginx
FROM nginx:alpine

WORKDIR /var/www/html

COPY config/vhost.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/bundle ./

