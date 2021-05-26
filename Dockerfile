FROM nginx

WORKDIR /usr/share/nginx/html
COPY ./dist/smart-home-frontend .

ENTRYPOINT ["nginx", "-g", "daemon off;"]