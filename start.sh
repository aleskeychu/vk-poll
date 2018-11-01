#!/usr/bin/env bash

#if [[ ! -d "/var/www/vendor" ]];
#then
#    cd /var/www
#    composer update
#    composer dump-autoload -o
#fi

#if [[ ! -d "/var/www/node_modules" ]];
#then
#    cd /var/www
#    npm install
#fi

# let db container init before migrating TODO do it differently
sleep 15
php artisan migrate

exec /usr/bin/supervisord -n -c /etc/supervisord.conf