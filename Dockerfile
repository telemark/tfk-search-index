###########################################################
#
# Dockerfile for tfk-search-index
#
###########################################################

# Setting the base to nodejs 4.4.3
FROM mhart/alpine-node:4.4.3

# Maintainer
MAINTAINER Geir Gåsodden

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