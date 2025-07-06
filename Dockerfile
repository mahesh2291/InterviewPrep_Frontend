FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

# Serve the "dist" folder instead of "build"
CMD ["serve", "-s", "dist", "-l", "80"]
