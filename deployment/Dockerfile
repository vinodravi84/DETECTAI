# Stage 1: Build React frontend
FROM node:18 AS frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# Stage 2: Set up Python backend
FROM python:3.11-slim AS backend

WORKDIR /app

# Install Python deps
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Copy frontend build into backend (to serve via FastAPI or Nginx)
COPY --from=frontend /app/frontend/build /app/frontend/build

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Use Nginx to serve React frontend
RUN rm -rf /var/www/html && ln -s /app/frontend/build /var/www/html

# Copy Nginx config (optional, or use default)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose necessary ports
EXPOSE 80
EXPOSE 8000

# CMD: Run both FastAPI and Nginx
CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]
