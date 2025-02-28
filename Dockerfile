from node:20-slim
workdir /app
copy package.json package-lock.json ./
run npm install
copy . .
cmd ["node","app.js"]
