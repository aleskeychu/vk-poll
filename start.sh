#!/bin/env bash

if [[ ! -d "/var/www/vendor" ]];
then
    cd /var/www
    composer update
    composer dump-autoload -o
fi

exec /usr/bin/supervisord -n -c /etc/supervisord.conf