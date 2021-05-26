# Stage 1
FROM node as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./frontend /app
#RUN npm run build --prod
RUN npm run build

# Stage 2
FROM nginx
COPY --from=build-step /app/docs /usr/share/nginx/html

# Start container
EXPOSE 80
CMD [ "node", "server.js" ]


# WORKDIR /usr/share/nginx/html
# COPY .frontend/dist .