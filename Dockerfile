FROM node:current-alpine
LABEL authors="Cole Perkins"
WORKDIR /src/

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/api/server.js"]