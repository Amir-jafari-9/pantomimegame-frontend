# Use the official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Next.js app
#RUN npm run build

# Expose the port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
