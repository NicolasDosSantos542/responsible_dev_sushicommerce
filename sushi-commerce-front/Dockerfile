# build environment
FROM node:12 as build
WORKDIR .
COPY . .
RUN npm i
RUN npm run build
# production environment
FROM nginx:stable-alpine
COPY --from=build /build /usr/share/nginx/html
COPY --from=build /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /cert/CA/private.key /etc/ssl/private/private.key
COPY --from=build /cert/CA/certificate.crt /etc/ssl/certs/certificate.crt
RUN nginx -t
RUN cd /etc/init.d/ nginx restart
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
