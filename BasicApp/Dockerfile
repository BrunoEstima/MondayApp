FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

# If you are building your code for development
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80

CMD [ "node", "app.js" ]