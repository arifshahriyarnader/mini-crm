FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build if using TypeScript
RUN if [ -f tsconfig.json ]; then npm run build; fi

EXPOSE 5000
CMD ["npm", "start"]