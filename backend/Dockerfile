# Use an official lightweight Python image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install gdown to download from Google Drive
RUN pip install gdown

# Copy the backend source code into the container
COPY . .

# Create models directory if it doesn't exist
RUN mkdir -p models

# Download the model file from Google Drive using gdown
# Replace YOUR_FILE_ID with the actual file ID from the shareable Drive link
RUN gdown --id 1MZBjCpXU1JPctsgljgzTk7jOJ88YIBo4 -O models/model.pth

# Expose the FastAPI port
EXPOSE 8000

# Start the FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
