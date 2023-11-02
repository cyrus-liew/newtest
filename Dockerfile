# Use the official Node.js image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the backend and frontend directories into the container
COPY ./backend-sit-forum-app-v1 /app/backend
COPY ./frontend-sit-forum-app /app/frontend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Expose the port that the backend will run on
EXPOSE 8888

# Install dependencies and build the frontend
WORKDIR /app/frontend
RUN npm install

# Start backend
WORKDIR /app/backend

# Expose the port that the frontend will run on
EXPOSE 3000

# Start the application
CMD (npm start &) && sleep 10 && cd /app/frontend && npm start
