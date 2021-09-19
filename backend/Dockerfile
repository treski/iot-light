# Name the node stage "builder"
FROM node:15-slim
# Set working directory
WORKDIR /app
# adds node_modules to PATH
ENV PATH /app/node_modules/.bin:$PATH
# copu local files to /app
COPY . /app
# install node modules and build assets
RUN npm install

EXPOSE 80

EXPOSE 1883

CMD ["node", "app.js"]