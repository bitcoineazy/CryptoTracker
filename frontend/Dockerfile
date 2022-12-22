# build env
FROM node:13.12.0-alpine as build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY . ./
