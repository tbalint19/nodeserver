FROM repository.vodafone.hu/docker-vodafone/voda-rhel7-nodejs-base:1.3.1

ADD . /appDir
WORKDIR /appDir

CMD ["pm2-runtime", "start", "start.sh"]

EXPOSE 8080
