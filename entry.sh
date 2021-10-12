#!/bin/sh

echo "Starting cron block!!"

# start cron daemon
crond

#clear crontab file - this will happen every restart... 
crontab -r
#start web server
npm start