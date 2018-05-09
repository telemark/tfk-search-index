# Setting the base to nodejs 8.10.0
FROM node:8.10.0-alpine@sha256:be5e82c58fc592977a407f3824e6e9706fd4dfd368539ed0cac09ecd813ee295

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node index.js
