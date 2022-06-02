# build environment
FROM node:12 as build
WORKDIR /sushi-commerce-front
COPY /.. .
RUN npm build
# production environment
FROM nginx:stable-alpine
COPY --from=build /sushi-commerce-front/build /usr/share/nginx/html
COPY --from=build /sushi-commerce-front/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /sushi-commerce-front/cert/CA/private.key /etc/ssl/private/private.key
COPY --from=build /sushi-commerce-front/cert/CA/certificate.crt /etc/ssl/certs/certificate.crt
RUN nginx -t
RUN cd /etc/init.d/ nginx restart
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
