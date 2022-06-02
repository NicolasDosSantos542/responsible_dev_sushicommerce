#  Dockerfile for Node Express Backend
FROM node:14.16.0-alpine3.10
# Create App Directory
RUN mkdir -p /sushi-commerce-back
WORKDIR /sushi-commerce-back

# Install Dependencies
COPY package*.json ./

RUN npm install -qyg nodemon@2.0.7
RUN npm install -qy
# Copy app source code
COPY . .
RUN node fakers/product.faker.js
#RUN node fakers/users.faker.js
# Exports
EXPOSE 4244
CMD npm start
