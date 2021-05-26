#!/bin/bash

FROM nginx

WORKDIR /usr/share/nginx/html
COPY ./test .
#RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]




#COPY ./dist/smart-home-frontend .
