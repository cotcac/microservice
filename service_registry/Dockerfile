FROM node:12
RUN mkdir -p /usr/src/app
#Specify a working directory
WORKDIR /usr/src/app

#Copy the dependencies file
COPY package*.json ./

RUN npm i

#Copy remaining files
COPY . .
EXPOSE 3003
#Default command
CMD ["npm","start"]