#!/usr/bin/env bash

if [[ ! -d "/var/www/vendor" ]];
then
    cd /var/www
    php artisan clear-compiled
    composer install --no-scripts
    composer update
    composer dump-autoload -o
fi

#if [[ ! -d "/var/www/node_modules" ]];
#then
#    cd /var/www
#    npm install
#fi

sleep 20
php artisan migrate

exec /usr/bin/supervisord -n -c /etc/supervisord.conf