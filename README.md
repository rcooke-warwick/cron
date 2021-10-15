# cron block
**A block to simplify scheduling actions on your device**


## Setup and configuration

Use this as standalone with the button below:

[![template block deploy with balena](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/rcooke-warwick/cron)

Or add the following service to your `docker-compose.yml`:

```yaml
version: "2.1"
volumes:
  scripts:
services:
  cron:
    restart: always
    image: ghcr.io/balena-io-playground/cron:latest
    volumes:
      - "scripts:/data"
    ports:
      - "80:3000"
```

> you can select the port used with an environment variable `CHRON_PORT`

## Documentation
This block presents a simple API to allow you to create and remove cron jobs. For example, you can create a job to occur every 2 mins: 
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"minute": "*/2", "command": "echo hello-world"}' \
   DEVICE_URL/createJob
```
The syntax for specifying time intervals can be found here:
https://ostechnix.com/a-beginners-guide-to-cron-jobs/

You can add scripts into the scripts volume, and schedule them to be run as described above if you want to schedule more complex tasks

## Getting Help

If you're having any problem, please [raise an issue](https://github.com/rcooke-warwick/cron/issues/new) on GitHub and we will be happy to help.


## License

balenablock-template is free software, and may be redistributed under the terms specified in the [license](https://github.com/rcooke-warwick/blob/master/LICENSE).
