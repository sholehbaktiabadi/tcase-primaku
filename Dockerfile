# Create node image
FROM node:current-alpine3.16

# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY . /app

# install and build
RUN npm install && npm run build

# run service
CMD ["npm", "run", "start"]