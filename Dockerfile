# Build stage
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM node:14-alpine
COPY --from=build /app/dist /app
COPY --from=build /app/node_modules node_modules
ENV DATABASE_HOST=db
ENV DATABASE_USER=your-username
ENV DATABASE_PASSWORD=your-password
ENV DATABASE_NAME=your-database-name
CMD ["npm", "start"]
