FROM node:12-alpine

WORKDIR /usr/app
COPY lib lib
COPY scripts scripts
COPY package.json .
COPY swagger.json .
COPY VERSION .
COPY entry.sh .
RUN echo $(ls)

RUN chmod +x entry.sh 
RUN npm install

CMD ["./entry.sh"]