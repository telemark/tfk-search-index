# Setting the base to nodejs 8.10.0
FROM node:8.10.0-alpine

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV JWT_KEY "Louie Louie, oh no, I got to go"
ENV SEARCH_SERVICE_URL https://search.service.com/api
ENV SEARCH_SERVICE_INDEX www
ENV SEARCH_SERVICE_INDEX_TYPE article
ENV SITEMAP_URL "http://www.yoursite.com/sitemap.xml"

# Startup
ENTRYPOINT node index.js