# Dockerfile
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server on all interfaces
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]