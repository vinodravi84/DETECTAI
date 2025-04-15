from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
from PIL import Image
import torch
from torchvision import transforms
from models.model import CIFARResNet18
from cifar100_classes import cifar100_classes
from torch.nn.functional import softmax  # Import softmax to compute probability

router = APIRouter()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize(mean=(0.5071, 0.4865, 0.4409),
                         std=(0.2673, 0.2564, 0.2762))
])

def load_model():
    model = CIFARResNet18(num_classes=100).to(device)
    checkpoint = torch.load("models/model.pth", map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()
    
    if 'class_to_idx' in checkpoint:
        idx_to_class = {v: k for k, v in checkpoint['class_to_idx'].items()}
    else:
        idx_to_class = {i: str(i) for i in range(100)}
    return model, idx_to_class

model, idx_to_class = load_model()

def predict_image(image_path):
    try:
        image = Image.open(image_path).convert('RGB')
        input_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(input_tensor)
            # Apply softmax to get probabilities
            probabilities = softmax(outputs, dim=1)
            _, predicted = torch.max(outputs, 1)
            predicted_idx = predicted.item()
            confidence = probabilities[0, predicted_idx].item()
            class_name = cifar100_classes.get(predicted_idx, str(predicted_idx))
        
        return class_name, confidence
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in image processing: {str(e)}")

@router.post("/predict")
async def predict_route(file: UploadFile = File(...)):
    os.makedirs("uploads", exist_ok=True)
    file_location = f"uploads/{file.filename}"

    try:
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result, confidence = predict_image(file_location)
        return {"prediction": result, "confidence": confidence}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")
