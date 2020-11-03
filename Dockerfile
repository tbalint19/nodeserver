FROM repository.vodafone.hu/docker-vodafone/voda-rhel7-nodejs10-base:latest

ADD . /appDir
WORKDIR /appDir

CMD ["pm2-runtime", "start", "start.sh"]

EXPOSE 8080
