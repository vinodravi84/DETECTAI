# 🔍 DetectAI — Intelligent Image Recognition System

<p align="center">
  <b>A sleek, production-ready AI-powered image recognition app built end-to-end with modern web technologies and deep learning best practices.</b><br><br>
</p>

<p align="center">
  <a href="https://your-demo-link.com">▶️ Live Demo</a> • <a href="https://github.com/your-user/detectai">📂 GitHub Repo</a>
</p>

---

## 🚀 Overview

**DetectAI** is a full-stack, real-time image recognition platform that combines modern frontend design with high-performance backend AI. Built with **React** for the UI and **FastAPI + PyTorch** for inference, it delivers a seamless user experience with cutting-edge AI capabilities — fully responsive, mobile-friendly, and Docker-ready for deployment anywhere.

---

## 🌟 Key Features

### ✨ Ultra-Modern UI
- Dark mode theme with **glassmorphism**, **neon glow**, and **animated buttons**
- Fully **responsive design** across desktops, tablets, and smartphones
- Smooth Lottie animations for dynamic feedback

### 🖼️ Instant Image Upload & Preview
- Drag-and-drop or traditional file browsing
- Live image thumbnail shown before prediction
- Placeholder with glowing “Upload Here” prompt

### 🤖 High-Performance AI
> Powered by a custom-trained deep learning model

- ⚙️ Custom **ResNet50** CNN trained on **100 diverse image classes**
- 🧠 Checkpoint resume + **mixed-precision training (AMP)** for efficiency
- 🧊 Optimized for **low VRAM GPUs** (e.g. **RTX 2050 4GB**)
- 🧪 Clean model packaging with `torch.load()` for fast inference

### ⚡ Lightning-Fast Prediction
- Uses `torch.no_grad()` for inference
- Asynchronous FastAPI endpoints
- Returns **top-3 predictions** with confidence scores
- Image preprocessing pipeline using PIL & torchvision

### 🐳 Docker-Ready Deployment
- Prebuilt **Dockerfile** and **docker-compose.yml**
- Includes **production-ready setup** with Nginx reverse proxy
- Run with a single command: `docker-compose up --build`

### 🔄 CI/CD Integration
- **GitHub Actions** for linting, test builds, and deploy pipeline
- Auto-build and push Docker images to Docker Hub or GHCR
- Ideal for staging → production workflows

---

## 🛠️ Tech Stack

| Layer         | Tech Used                             |
|---------------|----------------------------------------|
| **Frontend**  | React.js, Tailwind CSS (or CSS Modules), Lottie |
| **Backend**   | FastAPI, Python, PyTorch               |
| **AI Model**  | ResNet50, TorchVision, PIL             |
| **Infra**     | Docker, Docker Compose, Nginx          |
| **CI/CD**     | GitHub Actions, optional GHCR          |

---

## 🧠 Model Details

> A powerful yet efficient image classification model, designed for versatility.

- 🧩 **Model**: ResNet50 (PyTorch, from torchvision models)
- 🧠 **Training**: Trained from scratch on **100 custom classes**
- 🔁 Supports **checkpoint resume** from `.pth` file
- ⚡ Uses **AMP (mixed precision)** for faster, lighter training
- 🧊 Tested on **low VRAM GPUs (4GB)** for broader usability

---


## ⚙️ Local Development

### 📦 Backend (FastAPI + PyTorch)

```bash
cd backend/
pip install -r requirements.txt
uvicorn main:app --reload
