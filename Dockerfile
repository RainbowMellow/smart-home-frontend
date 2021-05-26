FROM nginx

# remove default html files
RUN rm -rf ./usr/share/nginx/html/*

# remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# add my config file
COPY ./my-nginx.conf /etc/nginx/conf.d/ng.conf

# add angular dist files
COPY ./dist/smart-home-frontend ./usr/share/nginx/html/

ENTRYPOINT ["nginx", "-g", "daemon off;"]