FROM     ubuntu:16.04
LABEL maintainer="manzajaro [at] gmail [dot] com"

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_HOME=/opt/android-sdk-linux \
    NODE_VERSION=10.13.0 \
    NPM_VERSION=6.4.1 \
    IONIC_VERSION=4.5.0 \
    CORDOVA_VERSION=8.1.2\
    GRADLE_VERSION=4.10.2
    
RUN apt-get update &&  \
    apt-get install -y git wget curl unzip build-essential ruby ruby-dev ruby-ffi gcc make && \
    curl --retry 3 -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" && \
    tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "node-v$NODE_VERSION-linux-x64.tar.gz" && \
    npm install -g npm@"$NPM_VERSION" && \
    npm install -g cordova@"$CORDOVA_VERSION" ionic@"$IONIC_VERSION" && \
    npm cache clear --force && \
    gem install sass && \
    git config --global user.email "you@example.com" && \
    git config --global user.name "Your Name" && \
    
WORKDIR myApp
EXPOSE 8100 35729
ENTRYPOINT ["bash", "ionic", "serve"]
