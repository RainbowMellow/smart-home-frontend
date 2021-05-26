FROM nginx

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/smart-home-frontend .

ENTRYPOINT ["nginx", "-g", "daemon off;"]