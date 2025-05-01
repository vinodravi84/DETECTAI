# Stage 1: Build the frontend
FROM node:16 AS frontend_build

# Set the working directory inside the container for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json for frontend dependency installation
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY frontend/ .

# Build the frontend application (Assuming you are using React or any JS framework)
RUN npm run build

# Stage 2: Set up the backend
FROM python:3.13-slim AS backend_build

# Set the working directory inside the container for the backend
WORKDIR /app

# Copy the backend requirements and install them
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Install the frontend build in the backend container
COPY --from=frontend_build /app/frontend/build /app/frontend/build

# Expose the necessary port
EXPOSE 8000

# Set the entrypoint to run both backend and frontend (using Uvicorn for FastAPI backend)
CMD ["python", "app.py"]
