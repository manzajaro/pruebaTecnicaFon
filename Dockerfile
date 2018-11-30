FROM     ubuntu:16.04
LABEL maintainer="manzajaro [at] gmail [dot] com"

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_HOME=/opt/android-sdk-linux \
    NODE_VERSION=10.13.0 \
    NPM_VERSION=6.4.1 \
    IONIC_VERSION=4.5.0 \
    CORDOVA_VERSION=8.1.2\
    GRADLE_VERSION=4.10.2

#First Build so that it will be faster later
RUN ionic cordova build android --prod --no-interactive --release

WORKDIR myApp
EXPOSE 8100 35729
CMD ["ionic", "serve"]
