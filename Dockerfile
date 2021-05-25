FROM nginx

WORKDIR /usr/share/nginx/html
COPY ./dist .

EXPOSE 80
CMD [ "node", "server.js" ]