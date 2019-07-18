FROM node:8.11.1

WORKDIR /usr/src/mastermind-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]