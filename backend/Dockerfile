FROM python:3.10-slim AS builder

WORKDIR /install

# Install build tools and upgrade pip
RUN apt-get update && apt-get install -y build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --upgrade pip

# Copy requirements.txt and the output folder
COPY requirements.txt ./
COPY output/ ./output/

# Download required wheels (torch CPU, torchvision CPU, numpy <2, others)
RUN pip download "torch==2.3.1+cpu" "torchvision==0.18.1+cpu" --index-url https://download.pytorch.org/whl/cpu -d output && \
    pip download "numpy<2" -d output && \
    pip download --timeout=300 -r requirements.txt -d output --extra-index-url https://download.pytorch.org/whl/cpu && \
    pip download --timeout=300 uvicorn -d output




# Install packages into /build-output
RUN pip install --no-cache-dir --find-links=./output --target=/build-output \
    "torch==2.3.1+cpu" "torchvision==0.18.1+cpu" "numpy<2" && \
    pip install --no-cache-dir --find-links=./output --target=/build-output -r requirements.txt && \
    pip install --no-cache-dir --find-links=./output --target=/build-output uvicorn



# Stage 2: Final image – Minimal runtime environment
FROM python:3.10-slim

WORKDIR /app

ENV PYTHONPATH=/usr/local/lib/python3.10/site-packages

# Copy installed packages
COPY --from=builder /build-output /usr/local/lib/python3.13/site-packages

# Copy your application code
COPY app.py .
COPY cifar100_classes.py .
COPY routes/ ./routes/
COPY models/ ./models/
COPY output/ ./output/

EXPOSE 8000

# Start FastAPI with uvicorn
CMD ["python", "app.py"]
