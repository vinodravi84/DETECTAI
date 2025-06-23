# 🔍 DetectAI  
> **Intelligent Image Recognition System**  

[▶️ **Try the Live Demo**](https://detectai-lilac.vercel.app/) • [📂 **GitHub Repo**](https://github.com/vinodravi84/DETECTAI)

DetectAI is a sleek, full-stack web application that lets you upload images and get **real-time**, **multi-class** predictions powered by a deep learning model. Built end-to-end—from React/Tailwind UI to Flask API to PyTorch inference—DetectAI showcases the fusion of **software engineering** and **gen AI** best practices.

---

## 🌟 Key Features

- **✨ Ultra-modern UI**  
  - Dark-mode, glassmorphism panels, animated buttons  
  - Responsive design (mobile ↔ desktop)  

- **🖼️ Instant Image Upload & Preview**  
  - Drag-and-drop or browse files  
  - Live thumbnail before inference  

- **🤖 High-Performance AI**  
  - Custom CNN (ResNet50) trained on **100 classes**  
  - Checkpoint resume & mixed-precision training support  
  - Low-VRAM optimized (RTX 2050 4 GB)  

- **⚡ Lightning-fast Inference**  
  - `torch.no_grad()` + asynchronous endpoints  
  - Returns top–3 predictions with confidence  

- **🐳 Docker-ready**  
  - Single-command launch via `docker-compose`  
  - Production Dockerfile + Nginx reverse proxy  

- **🔄 CI/CD Integrated**  
  - GitHub Actions for linting, tests, and builds  
  - Automated Docker image publish  
