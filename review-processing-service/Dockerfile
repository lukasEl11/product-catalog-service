FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# Build the app
COPY . ./
RUN npm ci
RUN npm run build

# Install only production dependencies
RUN rm -rf ./node_modules
RUN npm ci --omit=dev

EXPOSE 5100

CMD ["node", "./dist", "--env=production"]
