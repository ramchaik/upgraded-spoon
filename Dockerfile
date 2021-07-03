FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
ENV PORT 3000
EXPOSE ${PORT}
CMD ["node", "index.js"]