FROM nginx

WORKDIR /usr/share/nginx/html
#COPY ./dist/smart-home-frontend .
COPY ./test .
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "entrypoint.sh" ]