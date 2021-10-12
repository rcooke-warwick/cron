# cron block
**A block to simplify scheduling actions on your device**


## Setup and configuration

Use this as standalone with the button below:

[![template block deploy with balena](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/balenablocks/template)

Or add the following service to your `docker-compose.yml`:

```yaml
version: "2.1"
services:
  cron-block:
    restart: always
    image: ghcr.io/balena-io-playground/cron-block:latest
    ports:
      - "80:3000"
```

> If you want to use a webserver exposing a public facing page, you will need to remove the exposed port 80
> you can select the port used with an environment variable `CHRON_PORT`

## Documentation

Head over to our [docs](https://balenablocks.io/template/docs/) for detailed installation and usage instructions, customization options and more!

## Motivation
This block presents a simple api to allow you to create and remove cron jobs. For example, you can create a job to occur every 2 mins: 
```
curl -X POST -H "Content-Type: application/json" \
    -d '{"minute": "*/2", "command": "echo hello-world"}' \
   DEVICE_URL/createJob
```
The syntax for specifying time intervals can be found here:
https://ostechnix.com/a-beginners-guide-to-cron-jobs/

## Getting Help

If you're having any problem, please [raise an issue](https://github.com/balenablocks/cron-block/issues/new) on GitHub and we will be happy to help.

## Contributing

Do you want to help make cron-block better? Take a look at our [Contributing Guide](https://balenablocks.io/cron-block/contributing). Hope to see you around!

## License

balenablock-template is free software, and may be redistributed under the terms specified in the [license](https://github.com/balenablockstemplate/blob/master/LICENSE).
