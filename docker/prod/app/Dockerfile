FROM node:24

RUN usermod -u 1001 node
RUN usermod -u 1000 www-data

RUN apt update && apt install -y nginx
RUN npm install pm2 -g

COPY docker/local/app/nginx/conf.d /etc/nginx/conf.d

WORKDIR /var/www/html
COPY . .

COPY docker/local/app/system/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# for some reason this `/var/www/html/docker/local/app/pm2/ecosystem.config.cjs` breaks the app
CMD ["pm2-runtime", "docker/local/app/pm2/ecosystem.config.cjs"]