# Stage 1
#FROM node as build-step
#RUN mkdir -p /app
#WORKDIR /app
#COPY package.json /app
RUN npm install
#COPY . /app
#RUN npm run build --prod
RUN npm run build

# Stage 2
#FROM nginx
#COPY ./dist/smart-home-frontend /usr/share/nginx/html

FROM nginx

WORKDIR /usr/share/nginx/html
COPY ./dist/smart-home-frontend .

# Start container
EXPOSE 80
CMD [ "node", "server.js" ]
