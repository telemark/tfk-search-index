[![Build Status](https://travis-ci.org/telemark/tfk-search-index.svg?branch=master)](https://travis-ci.org/telemark/tfk-search-index)
[![Coverage Status](https://coveralls.io/repos/telemark/tfk-search-index/badge.svg?branch=master&service=github)](https://coveralls.io/github/telemark/tfk-search-index?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# tfk-search-index

Scrape webpage and index result in elasticsearch

## Docker
To run this module as a service use the docker image.

Change the [docker.env](docker.env) to match your environment

Build
```sh
$ docker build -t tfk-search-index .
```

or use the prebuilt image from [hub.docker.com](https://hub.docker.com/r/telemark/tfk-search-index)

```sh
$ docker pull telemark/tfk-search-index
```

Run a container

```sh
$ docker run --env-file=docker.env --rm tfk-search-index
```

This will spin up a container. Do the job. Shut it down and remove it.