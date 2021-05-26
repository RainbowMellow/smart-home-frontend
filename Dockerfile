FROM nginx

WORKDIR /usr/share/nginx/html
#COPY ./dist/smart-home-frontend .
#RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
