# Build stage
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:14-alpine
COPY --from=build ./app /app
COPY --from=build ./node_modules node_modules
ENV DATABASE_HOST=$DB_HOST
ENV DATABASE_USER=$DB_USER
ENV DATABASE_PASSWORD=$DB_PASSWORD
ENV DATABASE_NAME=$DB_NAME
CMD ["npm", "start"]
