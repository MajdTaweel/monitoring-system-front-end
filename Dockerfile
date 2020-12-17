### STAGE 1: Build ###
FROM node:12.7-alpine AS build

ENV http_proxy="http://213.244.124.19:3128" MAVEN_OPTS="-Dhttp.useProxy=true -Dhttp.proxyHost=213.244.124.19 -Dhttp.proxyPort=3128 -Dhttps.useProxy=true -Dhttps.proxyHost=213.244.124.19 -Dhttps.proxyPort=3128"
ENV https_proxy=$http_proxy ftp_proxy=$http_proxy

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/monitoring-system-front-end /usr/share/nginx/html