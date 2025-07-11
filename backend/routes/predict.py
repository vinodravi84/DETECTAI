from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
import torch
import clip
from PIL import Image

router = APIRouter()
device = "cuda" if torch.cuda.is_available() else "cpu"

# ─────────────────────────────────────────────────────────────────────────────
# Load CLIP model (ViT-L/14@336px)
print("🔁 Loading CLIP model ViT-L/14@336px...")
model, preprocess = clip.load("ViT-L/14@336px", device=device)
model.eval()
print("✅ CLIP model loaded.")

# ─────────────────────────────────────────────────────────────────────────────
# Load class names from file
CLASS_LIST_PATH = os.path.join(os.path.dirname(__file__), "..", "common_classes.txt")

def load_class_names():
    if not os.path.exists(CLASS_LIST_PATH):
        raise FileNotFoundError(f"❌ {CLASS_LIST_PATH} not found. Please add your class list.")
    with open(CLASS_LIST_PATH, "r", encoding="utf-8") as f:
        class_names = [line.strip() for line in f if line.strip()]
    if not class_names:
        raise ValueError("⚠️ No valid class names found in class list.")
    return class_names

CLASS_LABELS = load_class_names()

# ─────────────────────────────────────────────────────────────────────────────
# Prediction Logic
def predict_clip(image_path: str, class_names: list):
    try:
        image = Image.open(image_path).convert("RGB")
        image_input = preprocess(image).unsqueeze(0).to(device)
        text_tokens = clip.tokenize(class_names).to(device)

        with torch.no_grad():
            image_features = model.encode_image(image_input)
            text_features = model.encode_text(text_tokens)

            logits_per_image = image_features @ text_features.T
            probs = logits_per_image.softmax(dim=-1).cpu().numpy()

        top_index = probs[0].argmax()
        return class_names[top_index], float(probs[0][top_index])

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# ─────────────────────────────────────────────────────────────────────────────
# Upload API Route
@router.post("/predict_clip")
async def predict_route(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)
    file_path = os.path.join("uploads", file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        label, confidence = predict_clip(file_path, CLASS_LABELS)
        return {
            "prediction": label,
            "confidence": round(confidence, 4)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload or Prediction error: {str(e)}")
